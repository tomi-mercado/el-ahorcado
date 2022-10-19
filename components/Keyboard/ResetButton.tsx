import { Button, Kbd, useColorModeValue } from "@chakra-ui/react";

interface ResetButtonProps {
  onClick?: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  const bgColor = useColorModeValue("red.100", "red.300");

  if (!onClick) {
    return null;
  }

  return (
    <Kbd bgColor={bgColor} w="fit-content" p={4} as={Button} onClick={onClick}>
      Reiniciar (X)
    </Kbd>
  );
};

export default ResetButton;
