import { useEffect, useState } from "react";

export function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnView) return;
    if (hasStarted) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percent = Math.min(progress / duration, 1);
      // easeOutExpo
      const easePercent = 1 - Math.pow(1 - percent, 3);
      
      setCount(Math.floor(end * easePercent));
      
      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    setHasStarted(true);
    requestAnimationFrame(animate);
  }, [end, duration, startOnView, hasStarted]);

  return count;
}
