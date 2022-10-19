import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ToggleColorModeButton from "./ToggleColorModeButton";

const Navbar: React.FC = () => {
  const bgColor = useColorModeValue(
    "background.secondary",
    "background.secondaryDark"
  );

  return (
    <Box bgColor={bgColor}>
      <Container maxW="container.lg" py={4}>
        <Stack spacing={4} direction="row" justifyContent="space-between">
          <Heading size="lg">El Ahorcado</Heading>
          <ToggleColorModeButton />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
