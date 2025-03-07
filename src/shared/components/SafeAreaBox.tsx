import { createBox } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";

import { Theme } from "@/shared/theme";

export const SafeAreaBox = createBox<
  Theme,
  React.ComponentProps<typeof SafeAreaView>
>(SafeAreaView);

export type SafeAreaBoxProps = React.ComponentProps<typeof SafeAreaBox>;

export default SafeAreaBox;
