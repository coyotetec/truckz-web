import { Logo } from '../Logo';
import { ReactPortal } from '../ReactPortal';
import { Container } from './styles';
import { motion } from 'framer-motion';

export function SplashScreen() {
  return (
    <ReactPortal wrapperId="splash-screen-root">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Logo width={280} />
        </motion.div>
      </Container>
    </ReactPortal>
  );
}
