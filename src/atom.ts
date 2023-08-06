import { atom, atomFamily } from "recoil";
import { lightTheme, darkTheme } from "./theme";

export const themeState = atom({
    key: "themeState",
    default: lightTheme,
});

export const isDarkAtom = atom({
    key: "isDark",
    default: false,
})