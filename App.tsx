import React from "react";
import { View, StatusBar, } from "react-native";
import AppNavigation from "./src/action/appNavigation";
import { Root } from "native-base";

const App = () => {
  console.disableYellowBox = true;
  return (
    <Root>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <AppNavigation />
      </View>
    </Root>
  );
};
export default App;
