import { Dispatch, useEffect, useReducer } from "react";

interface GameState {
  expectedWord: string | undefined | null;
  typedLetters: string[];
  errorsAmount: number;
  isFinished: "win" | "lost" | false;
}

type Action =
  | { type: "TYPE_LETTER"; payload: string }
  | { type: "RESET" }
  | { type: "UPDATE_IS_FINISHED" }
  | { type: "SET_EXPECTED_WORD"; payload: string };

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
    case "SET_EXPECTED_WORD": {
      return {
        ...state,
        expectedWord: action.payload,
      };
    }
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
      if (state.isFinished || !state.expectedWord) {
        return state;
      }
      const letter = action.payload;

      const isPreviouslyPressed = state.typedLetters.includes(letter);

      const isCorrect = state.expectedWord.includes(letter);

      return reducer(
        {
          ...state,
          typedLetters: [...state.typedLetters, letter],
          errorsAmount:
            isCorrect || isPreviouslyPressed
              ? state.errorsAmount
              : state.errorsAmount + 1,
        },
        { type: "UPDATE_IS_FINISHED" }
      );
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const useSetExpectedWordOnWordChange = (
  word: string | null,
  dispatch: Dispatch<Action>
) => {
  useEffect(() => {
    if (word) {
      dispatch({ type: "SET_EXPECTED_WORD", payload: word });
    }
  }, [word, dispatch]);
};

const useGame = (word: string | null) => {
  const [gameState, dispatch] = useReducer<ReducerGameState, GameState>(
    reducer,
    initialState,
    () => initialState
  );

  useSetExpectedWordOnWordChange(word, dispatch);

  return {
    gameState,
    dispatch,
  };
};

export default useGame;
