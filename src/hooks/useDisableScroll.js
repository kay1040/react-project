import { useEffect } from 'react';

export default function useDisableScroll(disable) {
  useEffect(() => {
    const handleTouchMove = (e) => {
      e.preventDefault();
    };
    if (disable) {
      document.body.style.overflowY = 'hidden';
      document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    return () => {
      const count = document.querySelectorAll('.mask').length;
      // 若沒有遮罩層才顯示滾動條
      if (count < 1) {
        document.body.style.overflowY = 'auto';
      }
      document.body.removeEventListener('touchmove', handleTouchMove, { passive: false });
    };
  }, [disable]);
}
