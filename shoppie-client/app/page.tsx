import Image from "next/image";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "./components/Header";
const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Home() {
  return (
    <MantineProvider theme={theme}>

      <LandingPage />
    </MantineProvider>
  );
}
