import { useEffect } from "react";
import { KeyboardProps } from "../components/Keyboard";

interface UseKeyboardGameParam extends Omit<KeyboardProps, "type"> {
  selectedKeyboard: string[];
}

const useKeyboardGame = ({
  expectedWord,
  onClick,
  typedLetters,
  onReset,
  selectedKeyboard,
}: UseKeyboardGameParam) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key;

      if (selectedKeyboard.includes(letter)) {
        onClick(letter);
      } else if (event.key === "Escape" || event.key === "Esc") {
        onReset?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expectedWord, typedLetters, onClick, onReset, selectedKeyboard]);
};

export default useKeyboardGame;
