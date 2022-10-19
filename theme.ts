import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    background: {
      primary: defaultTheme.colors.gray[50],
      secondary: defaultTheme.colors.gray[100],
      primaryDark: defaultTheme.colors.gray[800],
      secondaryDark: defaultTheme.colors.gray[700],
    },
    text: {
      default: defaultTheme.colors.gray[800],
      defaultDark: defaultTheme.colors.whiteAlpha[900],
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("text.default", "text.defaultDark")(props),
        background: mode("background.primary", "background.primaryDark")(props),
        minH: "100vh",
      },
    }),
  },
});

export default theme;
