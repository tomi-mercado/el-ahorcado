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
    <Kbd
      w="fit-content"
      as={Button}
      p={4}
      variant="destructive"
      onClick={onClick}
    >
      Reiniciar (X)
    </Kbd>
  );
};

export default ResetButton;
