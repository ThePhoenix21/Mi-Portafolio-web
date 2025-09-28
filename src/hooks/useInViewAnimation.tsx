import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationProps {
  threshold?: number;
  delay?: number;
}

export const useInViewAnimation = ({ 
  threshold = 0.1, 
  delay = 0 
}: UseInViewAnimationProps = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  return { ref, isInView };
};