import { Stack } from "@mui/material";
import { FC } from "react";

export interface GuessProps {
  guessValue: string;
  highlightValue: ("present" | "present-wrong-position" | "not-present")[];
}

export const Guess: FC<GuessProps> = ({ guessValue, highlightValue }) => {
  return (
    <Stack direction={"row"} gap="8px">
      {Array.from(guessValue.toUpperCase()).map((character, index) => {
        const highlightValueForCharacter = highlightValue[index];
        return (
          <Stack
            key={index}
            border={"1px solid black"}
            padding={"4px"}
            width={"16px"}
            alignItems={"center"}
            bgcolor={
              highlightValueForCharacter === "present"
                ? "green"
                : highlightValueForCharacter === "present-wrong-position"
                ? "yellow"
                : "gray"
            }
          >
            {character}
          </Stack>
        );
      })}
    </Stack>
  );
};
