import { useEffect } from 'react';

export default function useDisableScroll(disable) {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const count = document.querySelectorAll('.mask').length;
  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };
    if (disable) {
      document.body.style.overflowY = 'hidden';
      if (count < 1) document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    return () => {
      // 若沒有遮罩層才顯示滾動條
      if (count < 1) {
        document.body.style.overflowY = 'auto';
        document.body.style.paddingRight = 0;
      }
      document.body.removeEventListener('touchmove', handleTouchMove, { passive: false });
    };
  }, [disable]);
}
