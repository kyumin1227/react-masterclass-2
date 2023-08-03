import { atom } from "recoil";
import { lightTheme, darkTheme } from "./theme";

export const themeState = atom({
    key: "themeState",
    default: lightTheme,
});