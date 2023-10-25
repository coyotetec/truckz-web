import { ReactPortal } from '../ReactPortal';
import { Overlay } from './styles';

interface LoaderProps {
  visible: boolean;
}

export function Loader({ visible }: LoaderProps) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal wrapperId="loader-root">
      <Overlay>
        <p>Loading...</p>
      </Overlay>
    </ReactPortal>
  );
}
