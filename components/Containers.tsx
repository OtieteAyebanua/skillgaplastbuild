import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IPageContainer {
  children: ReactNode;
  paddingBottom?: string;
  style?: any;
  backgroundColor?: string;
}
const PageContainer = ({
  children,
  paddingBottom,
  style,
  backgroundColor,
}: IPageContainer) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          height: hp("100%"),
          paddingTop: 20,
          paddingBottom: paddingBottom ? insets.bottom : 0,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>{children}</>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PageContainer;
