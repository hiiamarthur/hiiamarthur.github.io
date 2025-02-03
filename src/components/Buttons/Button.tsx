import { Component, createSignal, onMount, onCleanup, JSX } from 'solid-js';
import { styled } from 'solid-styled-components';
import { animated,createSpring } from 'solid-spring';
import { ButtonToggleIndicator } from './ButtonToggleIndicator';
import { ButtonProps } from './type.d';

// Constants
const SKEW_OFFSET_PX = 8;
const STROKE_WIDTH_PX = 2;
const REM_PX = 16;

// Styled Components
const ButtonContainer = styled('div')`
  position: relative;
  display: inline-block;
`;

const ButtonElement = styled('button')<{ toggled?: boolean }>`
  position: relative;
  display: block;
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  padding-left: ${props => props.toggled ? '2rem' : '0rem'};
  &:focus, &:active {
    outline: none;
  }
`;




const ButtonSvg = styled(animated.svg)<JSX.SvgSVGAttributes<SVGSVGElement>>`
  position: absolute;
  top: `+`${-STROKE_WIDTH_PX / 2 / REM_PX}`+`rem;
  left: ${-SKEW_OFFSET_PX / 2 / REM_PX - STROKE_WIDTH_PX / REM_PX}rem;
  pointer-events: none;
`;

const ButtonPath = styled('path')`
  fill: transparent;
  stroke: #f0f;
  stroke-width: `+`${STROKE_WIDTH_PX}`+`;
`;



const Button: Component<ButtonProps> = (props) => {
  let buttonRef: HTMLDivElement | undefined;
  let pathRef: SVGPathElement | undefined;
  
  const [hovering, setHovering] = createSignal(false);
  const [clicking, setClicking] = createSignal(false);
  const [size, setSize] = createSignal([0, 0]);
  const [pathLength, setPathLength] = createSignal(0);

  // Helper functions
  const calculateSvgSize = (width = 0, height = 0) => [
    width + SKEW_OFFSET_PX * 2 + STROKE_WIDTH_PX * 2,
    height + STROKE_WIDTH_PX
  ];

  const calculateSvgViewBox = (width = 0, height = 0) => {
    const [svgWidth, svgHeight] = calculateSvgSize(width, height);
    return `${-STROKE_WIDTH_PX / 2} 0 ${svgWidth} ${svgHeight}`;
  };

  const calculatePath = (width = 0, height = 0) => {
    const n = (num: number) => num + STROKE_WIDTH_PX / 2;
    return [
      'M',
      [n(width + SKEW_OFFSET_PX), n(height)],
      [n(SKEW_OFFSET_PX), n(height)],
      [n(0), n(0)],
      [n(width), n(0)],
      'Z'
    ].join(' ');
  };

  // Event handlers
  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);
  const handleMouseDown = () => setClicking(true);
  const handleMouseUp = () => {
    setTimeout(() => setClicking(false), 360);
  };

  // Animations
  const pathSpring = createSpring(() => ({
    strokeDasharray: hovering() 
      ? `${pathLength() / 2} ${pathLength()}`
      : `0 ${pathLength()}`
  }));

  const buttonSpring = createSpring(() => ({
    config: { tension: 170 * 3 },
    transform: hovering()
      ? clicking()
        ? 'translate3d(0.15rem, -0.15rem, 0)'
        : 'translate3d(0.25rem, -0.25rem, 0)'
      : 'translate3d(0rem, 0rem, 0)',
    delay: hovering() ? 0 : 180,
    fill: "transparent",
    stroke: "#f0f",
    strokeWidth: STROKE_WIDTH_PX
  }));

  // Lifecycle
  onMount(() => {
    if (buttonRef) {
      const handleResize = () => {
        setSize([buttonRef!.offsetWidth, buttonRef!.offsetHeight]);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      onCleanup(() => window.removeEventListener('resize', handleResize));
    }

    if (pathRef) {
      setPathLength(pathRef.getTotalLength?.() || 0);
    }
  });

  const [width, height] = size();
  const [svgWidth, svgHeight] = calculateSvgSize(width, height);
  const viewBox = calculateSvgViewBox(width, height);
  const pathD = calculatePath(width, height);

  return (
    <ButtonContainer ref={buttonRef} class={props.class}>
      <svg width={svgWidth} height={svgHeight} viewBox={viewBox} 
      style={{
        position: 'absolute',
        top: `${-STROKE_WIDTH_PX / 2 / REM_PX}rem`,
        left: `${-SKEW_OFFSET_PX / 2 / REM_PX - STROKE_WIDTH_PX / REM_PX}rem`,
        'pointer-events': 'none'
      }}>
        <path
          ref={pathRef}
          d={pathD}
          style={pathSpring()}
        />
      </svg>
      <animated.div style={buttonSpring()}>
        {/* {props.children} */}
        <svg width={svgWidth} height={svgHeight} viewBox={viewBox}>
          <path d={pathD} />
        </svg>
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={props.onClick}
          toggled={props.toggled}
        >
          {props.children}
        </Button>
        {/* <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={props.onClick}
          toggled={props.toggled}
        >
          {props.children}
        </button> */}
        {/* <ButtonToggleIndicator toggled={props.toggled} /> */}
    </animated.div>
    </ButtonContainer>
  );
};

export default Button;
