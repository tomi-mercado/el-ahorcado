import type { NextPage } from "next";

import { Container, Heading, Stack, useDisclosure } from "@chakra-ui/react";

import Assertions from "../components/Assertions";
import EndGameMessage from "../components/EndGameMessage";
import Illustration from "../components/Illustration";
import Keyboard from "../components/Keyboard";
import Dialog from "../components/Dialog";
import LoadingWrapper from "../components/LoadingWrapper";

import { useGetWord } from "../api";

import useGame from "../hooks/useGame";

const Home: NextPage = () => {
  const {
    isOpen: isResetAlertOpen,
    onToggle: toggleResetAlertOpen,
    onClose: closeResetAlert,
  } = useDisclosure();

  const { word: expectedWord, refresh, loading } = useGetWord();
  const { gameState, dispatch } = useGame(expectedWord);

  const handleKeyboard = (letter: string) => {
    dispatch({ type: "TYPE_LETTER", payload: letter });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    refresh();
    closeResetAlert();
  };

  return (
    <>
      <Container maxW="container.lg" py={6} h="100vh">
        <Stack alignItems="center" spacing={4} justifyContent="center" h="full">
          <Heading size="lg">El ahorcado</Heading>

          <Illustration errorsAmount={gameState.errorsAmount} />

          <LoadingWrapper
            loading={loading}
            noSpinner
            justifyContent="center"
            minH={9}
          >
            {!gameState.isFinished && (
              <Assertions
                expectedWord={expectedWord}
                typedLetters={gameState.typedLetters}
              />
            )}
          </LoadingWrapper>

          <LoadingWrapper loading={loading} minH={208} justifyContent="center">
            <Stack spacing={2} w="full" alignItems="center">
              <EndGameMessage
                lost={gameState.isFinished === "lost"}
                win={gameState.isFinished === "win"}
                expectedWord={expectedWord || ""}
              />

              <Keyboard
                onClick={handleKeyboard}
                expectedWord={expectedWord || ""}
                typedLetters={gameState.typedLetters}
                onReset={toggleResetAlertOpen}
              />
            </Stack>
          </LoadingWrapper>
        </Stack>
      </Container>

      <Dialog
        isOpen={isResetAlertOpen}
        onClose={toggleResetAlertOpen}
        title="¿Estás seguro?"
        description="Se reiniciará el juego"
        buttons={[
          {
            label: "Cancelar",
            onClick: toggleResetAlertOpen,
            isLeastDestructive: true,
            variant: "outline",
          },
          { label: "Reiniciar", onClick: handleReset, bgColor: "red.100" },
        ]}
      />
    </>
  );
};

export default Home;
