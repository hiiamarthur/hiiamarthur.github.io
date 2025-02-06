import { createSignal, onCleanup, onMount, splitProps, JSX, children } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type TypewriterProps = {
  element?: keyof JSX.IntrinsicElements; // Any valid HTML element
  children: JSX.Element | string; // Accepts JSX content
  speed?: number;
  class?: string;
};

type TextTags = Extract<keyof JSX.IntrinsicElements, `h${1 | 2 | 3 | 4 | 5 | 6}` | "p">;


const Typewriter = (props: TypewriterProps) => {
  const [local, others] = splitProps(props, ['element', 'children', 'speed', 'class']);
  const [displayedText, setDisplayedText] = createSignal('');
  let index = 0;
  let interval: NodeJS.Timeout;
  
  const resolvedChildren = children(() => props.children);
  const firstChild = resolvedChildren() as HTMLElement | undefined;

  const Tag = (firstChild?.nodeName.toLowerCase() as TextTags) || 'p';
  const text = typeof local.children === 'string' ? local.children : (local.children as any)?.textContent || '';

  onMount(() => {
    interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, local.speed || 100);
  });

  onCleanup(() => clearInterval(interval));

  return (
    <Dynamic component={Tag} class={props.class}>
    {displayedText()}
    <span class="animate-blink">|</span>
  </Dynamic>
  );
};

export default Typewriter;
