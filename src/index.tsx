import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme, lightTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import { themeState } from "./atom";


const queryClient = new QueryClient();

const Root = () => {
  
  const theme = useRecoilValue(themeState);
  
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
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