import {
  extendTheme,
  theme as defaultTheme,
  defineStyleConfig,
} from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const Button = defineStyleConfig({
  variants: {
    destructive: (props: StyleFunctionProps) => ({
      bgColor: mode("red.100", "red.300")(props),
      _hover: {
        bgColor: mode("red.200", "red.400")(props),
      },
    }),
  },
});

const Kbd = defineStyleConfig({
  variants: {
    destructive: (props: StyleFunctionProps) =>
      Button.variants?.destructive(props) || {},
  },
});

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
  components: {
    Button,
    Kbd,
  },
});

export default theme;
