import { createSignal, createEffect } from 'solid-js';

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = createSignal(0);
  
  createEffect(() => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  });

  return count;
}

export default useCountUp;