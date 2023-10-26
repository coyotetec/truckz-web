import { useLottie } from 'lottie-react';
import spinnerAnimation from '../../../assets/lottie/spinner.json';

export function Spinner() {
  const { View, setSpeed } = useLottie(
    {
      animationData: spinnerAnimation,
      autoPlay: true,
      loop: true,
    },
    {
      height: 100,
      width: 100,
    },
  );

  setSpeed(2);

  return View;
}
