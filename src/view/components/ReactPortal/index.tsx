import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

export function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let created = false;

    if (!element) {
      created = true;
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', wrapperId);
      document.body.appendChild(wrapper);
      element = wrapper;
    }

    setWrapper(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapper) {
    return null;
  }

  return createPortal(children, wrapper);
}
