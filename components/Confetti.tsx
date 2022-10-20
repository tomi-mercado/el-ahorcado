import ReactConfetti from "react-confetti";

import useWindowSize from "../hooks/useWindowSize";

interface ConfettiProps {
  win: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ win }) => {
  const { height, width } = useWindowSize();

  if (!win) {
    return null;
  }

  return <ReactConfetti height={height} width={width} />;
};

export default Confetti;
