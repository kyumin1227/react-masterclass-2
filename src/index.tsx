import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import { isDarkAtom, themeState } from "./atom";


const queryClient = new QueryClient();

const Root = () => {
  
  const isDark = useRecoilValue(isDarkAtom);
  
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);