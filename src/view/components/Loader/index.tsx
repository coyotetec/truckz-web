import { useDisableBodyScroll } from '../../../hooks/useDisableBodyScroll';
import { ReactPortal } from '../ReactPortal';
import { Spinner } from '../Spinner';
import { Overlay } from './styles';

interface LoaderProps {
  visible: boolean;
}

export function Loader({ visible }: LoaderProps) {
  useDisableBodyScroll(visible);

  if (!visible) {
    return null;
  }

  return (
    <ReactPortal wrapperId="loader-root">
      <Overlay>
        <Spinner />
      </Overlay>
    </ReactPortal>
  );
}
