import { createSignal, onMount, onCleanup } from 'solid-js';

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [ref, setRef] = createSignal<HTMLElement>();

  onMount(() => {
    const element = ref();
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);
    onCleanup(() => observer.disconnect());
  });

  return [isVisible, setRef] as const;
}

export default useIntersectionObserver;