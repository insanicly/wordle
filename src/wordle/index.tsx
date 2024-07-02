import { Skeleton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { compareTwoString } from "../compare-two-string";
import {
  maxTryCount,
  todaysWordLink,
  todaysWordValidationLink,
  wordLetterCount,
} from "../constants";
import { Guess, GuessProps } from "../guess";

export interface WordleProps {}

export const Wordle: FC<WordleProps> = () => {
  const refTextField = useRef<HTMLInputElement>(null);
  const [guesses, setGuesses] = useState<GuessProps[]>([]);
  const [todaysWord, setTodaysWord] = useState("baring");
  const [isCorrectlyGuessed, setIsCorrectlyGuessed] = useState(false);

  useEffect(() => {
    axios.get(todaysWordLink).then((response) => {
      setTodaysWord(response.data);
    });
  }, []);

  const title = useMemo(() => {
    if (maxTryCount === guesses.length) {
      return `The word was ${todaysWord}`;
    } else {
      return !isCorrectlyGuessed
        ? `You have ${maxTryCount - guesses.length} guesses remaining`
        : `You correctly guessed the word in ${guesses.length} tries!`;
    }
  }, [guesses.length, isCorrectlyGuessed, todaysWord]);

  return todaysWord ? (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const guessedValue = refTextField.current?.value;
        if (guessedValue) {
          return await axios
            .post(todaysWordValidationLink, { word: guessedValue })
            .then((response) => {
              if (response.data) {
                const result = compareTwoString({
                  answer: todaysWord,
                  guess: guessedValue,
                });
                setGuesses((prevGuesses) => [
                  ...prevGuesses,
                  {
                    guessValue: guessedValue,
                    highlightValue: result,
                  },
                ]);

                const correctlyGuessed = result.every((r) => r === "present");
                if (correctlyGuessed) {
                  setIsCorrectlyGuessed(true);
                }
                return true;
              }
              return false;
            });
        }
        return false;
      }}
    >
      <Stack gap={"8px"} alignItems={"center"}>
        <Typography variant="h5">{title}</Typography>
        {!isCorrectlyGuessed && guesses.length < maxTryCount && (
          <TextField
            inputRef={refTextField}
            size="small"
            name="guess"
            inputProps={{
              maxLength: wordLetterCount,
              minLength: wordLetterCount,
            }}
            autoFocus
          />
        )}
        <Stack direction="column" gap={"8px"}>
          {guesses.map((guess, index) => (
            <Guess {...guess} key={index} />
          ))}
        </Stack>
        {(isCorrectlyGuessed || guesses.length === maxTryCount) && (
          <button
            onClick={() => {
              setGuesses([]);
              setIsCorrectlyGuessed(false);
            }}
          >
            Reset
          </button>
        )}
      </Stack>
    </form>
  ) : (
    <Skeleton variant="rectangular" height={"32px"} width={"100%"} />
  );
};
