import { useEffect } from 'react';

export default function useDisableScroll() {
  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.body.style.overflowY = 'auto';
      document.body.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
}
