import { Button, Kbd, chakra } from "@chakra-ui/react";

interface ResetButtonProps {
  onClick?: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  if (!onClick) {
    return null;
  }

  return (
    <Kbd
      w="fit-content"
      as={Button}
      p={{ base: 1, md: 4 }}
      variant="destructive"
      onClick={onClick}
      minW={{ base: 6, md: 10 }}
      h={{ base: 8, md: 10 }}
    >
      [X]{" "}
      <chakra.span display={{ base: "none", md: "initial" }}>
        Reiniciar
      </chakra.span>
    </Kbd>
  );
};

export default ResetButton;
