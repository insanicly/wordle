import { Stack } from "@mui/material";
import { Wordle } from "../wordle";

export function App() {
  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      padding={"24px"}
    >
      <Wordle />
    </Stack>
  );
}
