import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const ToggleColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} variant="outline">
      {colorMode === "dark" ? "🌙" : "☀️"}
    </Button>
  );
};

export default ToggleColorModeButton;
