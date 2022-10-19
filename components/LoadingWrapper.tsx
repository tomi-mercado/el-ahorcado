import {
  Stack,
  StackProps,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";

import { DotSpinner } from "@uiball/loaders";

interface LoadingWrapperProps extends StackProps {
  loading: boolean;
  children: React.ReactNode;
  noSpinner?: boolean;
}

export const Loading = () => {
  const [textDefault, textDefaultDark] = useToken("colors", [
    "text.default",
    "text.defaultDark",
  ]);

  const color = useColorModeValue(textDefault, textDefaultDark);

  return <DotSpinner size={130} speed={0.9} color={color} />;
};

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  loading,
  noSpinner,
  ...props
}) => {
  return (
    <Stack {...props}>
      {!loading ? children : !noSpinner ? <Loading /> : null}
    </Stack>
  );
};

export default LoadingWrapper;
