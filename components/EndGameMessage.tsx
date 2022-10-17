import { Text } from "@chakra-ui/react";

interface EndGameMessageProps {
  win: boolean;
  lost: boolean;
}

const EndGameMessage: React.FC<EndGameMessageProps> = ({ lost, win }) => {
  if (win && lost) {
    throw new Error("You can't win and lost at the same time");
  }

  if (!win && !lost) {
    return null;
  }

  return (
    <Text fontSize="3xl" color={win ? "green.400" : "red.400"}>
      {win ? "You win" : "You lost"}
    </Text>
  );
};

export default EndGameMessage;
