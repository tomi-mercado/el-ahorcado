import { useReducer } from "react";

interface GameState {
  expectedWord: string | undefined | null;
  typedLetters: string[];
  errorsAmount: number;
  isFinished: "win" | "lost" | false;
}

type Action =
  | { type: "TYPE_LETTER"; payload: string }
  | { type: "RESET" }
  | { type: "UPDATE_IS_FINISHED" };

type ReducerGameState = (state: GameState, action: Action) => GameState;

const errorsMaxAmount = 6;

const initialState: GameState = {
  typedLetters: [],
  errorsAmount: 0,
  isFinished: false,
  expectedWord: null,
};

const reducer: ReducerGameState = (state, action) => {
  switch (action.type) {
    case "UPDATE_IS_FINISHED":
      const userLost = state.errorsAmount === errorsMaxAmount;
      const userWin = state.expectedWord
        ?.split("")
        .every((letter) => state.typedLetters.includes(letter));

      return {
        ...state,
        isFinished: userLost ? "lost" : userWin ? "win" : false,
      };
    case "TYPE_LETTER":
      if (state.isFinished) {
        return state;
      }
      const letter = action.payload;

      const isCorrect = state.expectedWord?.includes(letter);
      const isPreviouslyPressed = state.typedLetters.includes(letter);

      return reducer(
        {
          ...state,
          typedLetters: isPreviouslyPressed
            ? state.typedLetters
            : [...state.typedLetters, letter],
          errorsAmount: isCorrect ? state.errorsAmount : state.errorsAmount + 1,
        },
        { type: "UPDATE_IS_FINISHED" }
      );
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const useGame = (word: string | null) => {
  const initialStateWithWord = { ...initialState, expectedWord: word };

  const [gameState, dispatch] = useReducer<ReducerGameState, GameState>(
    reducer,
    initialStateWithWord,
    () => initialStateWithWord
  );

  return {
    gameState,
    dispatch,
  };
};

export default useGame;
