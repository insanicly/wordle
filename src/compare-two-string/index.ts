import { GuessProps } from "../guess";

export const compareTwoString: (params: {
  answer: string;
  guess: string;
}) => GuessProps["highlightValue"] = ({ answer, guess }) => {
  const guessArray = Array.from(guess);
  let answerArray = Array.from(answer);
  const result = guessArray.map((guessCharacter, mapIndex) => {
    const foundIndex = answerArray.findIndex((a) => a === guessCharacter);
    if (foundIndex < 0) {
      return "not-present";
    } else if (foundIndex === mapIndex) {
      answerArray[foundIndex] = "something else";
      return "present";
    } else if (foundIndex >= 0 && foundIndex !== mapIndex) {
      answerArray[foundIndex] = "something else";
      return "present-wrong-position";
    }
    throw new Error("Something is wrong with the compare two string method");
  });
  return result;
};
