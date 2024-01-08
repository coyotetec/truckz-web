import { useEffect } from 'react';

export function useDisableBodyScroll(disable: boolean) {
  useEffect(() => {
    if (disable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [disable]);
}
