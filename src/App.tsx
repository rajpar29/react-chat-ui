import { useEffect, useState } from "react"

import { CssBaseline, Theme, ThemeProvider, useTheme } from "@mui/material"

import { watchTheme, restorePrefferedTheme } from "./theme"
import { Header } from "./components/Header/Header"
import { Chat } from "./components/Chat/Chat"


export const App = () => {

  useEffect(() => {
    restorePrefferedTheme();
  }, []);

  const [theme, setTheme] = useState<Theme>(useTheme());
  watchTheme().subscribe(newTheme => setTheme(newTheme))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Chat />
    </ThemeProvider>
  )
}
