# The hangman

Classic hangman game. The player has to guess a word by suggesting letters. If the letter is in the word, it is revealed. If not, the player loses a life. If the player loses all his lives, he loses.
The game is available only in Spanish.

Try it out: https://el-ahorcado.vercel.app/

### Run locally

1. Clone the repo
2. Install dependencies: `yarn install`
3. Add a `.env` file with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run app: `yarn dev`
