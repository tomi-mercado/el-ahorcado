import type { NextPage } from "next";

import Head from "next/head";

import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";

import Assertions from "../components/Assertions";
import EndGameMessage from "../components/EndGameMessage";
import Illustration from "../components/Illustration";
import Keyboard from "../components/Keyboard";
import Dialog from "../components/Dialog";
import LoadingWrapper from "../components/LoadingWrapper";
import Navbar from "../components/Navbar";

import { useGetWord } from "../api";

import useGame from "../hooks/useGame";
import Confetti from "../components/Confetti";

const Home: NextPage = () => {
  const {
    isOpen: isResetAlertOpen,
    onToggle: toggleResetAlertOpen,
    onClose: closeResetAlert,
  } = useDisclosure();

  const { word: expectedWord, refresh, loading } = useGetWord();
  const { gameState, dispatch } = useGame(expectedWord);

  const userWin = gameState.isFinished === "win";
  const userLost = gameState.isFinished === "lost";

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
      <Head>
        <title>El Ahorcado</title>
        <meta name="description" content="Juego del ahorcado" />
      </Head>

      <Navbar />

      <Container maxW="container.lg">
        <Stack alignItems="center" spacing={4} h="full" pb={8}>
          <Stack spacing={16} alignItems="center">
            <Illustration errorsAmount={gameState.errorsAmount} />

            <LoadingWrapper
              loading={loading}
              noSpinner
              justifyContent="center"
              minH={9}
            >
              <Assertions
                expectedWord={expectedWord}
                typedLetters={gameState.typedLetters}
              />
            </LoadingWrapper>
          </Stack>

          <LoadingWrapper loading={loading} minH={208} justifyContent="center">
            <Stack spacing={2} w="full" alignItems="center">
              <Box minH={90}>
                <EndGameMessage
                  lost={userLost}
                  win={userWin}
                  expectedWord={expectedWord || ""}
                />
              </Box>

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
          { label: "Reiniciar", onClick: handleReset, variant: "destructive" },
        ]}
      />

      <Confetti win={userWin} />
    </>
  );
};

export default Home;
