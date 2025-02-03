
import {styled} from 'styled-components';
import { animated, createSpring } from 'solid-spring';
import { Component } from 'solid-js';

export const ButtonToggleIndicator: Component<{ toggled: boolean }> = ({ toggled, ...restProps }) => {
    const activeSpring = createSpring({
      opacity: toggled ? 1 : 0,
      backgroundColor: "#f0f",
      height: "100%",
      borderRadius: "inherit",
    });
  
    return (
      <div 
        {...restProps}
        style={{
          position: 'absolute',
          top: '50%',
          bottom: 0,
          left: `${(2 - 0.5) / 2}rem`,
          transform: 'translateY(-50%)',
          'pointer-events': 'none',
          width: '0.5rem',
          height: '0.5rem',
          'border-radius': '50%',
          'background-color': '#fff4'
        }}
      >
        <animated.div style={activeSpring()} />
      </div>
    );
  };

