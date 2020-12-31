import React from "react";
import { View, Text } from "native-base";
import { SafeAreaView } from "react-native";
import { INavigationProps } from "../../interfaces/navigation";

export default class alertPage extends React.Component<INavigationProps> {
  //@ts-ignore

  constructor(prop: any) {
    super(prop);
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <SafeAreaView
          style={{ minHeight: "100%", backgroundColor: "#fff" }}>
          <View style={{padding:16}}>
            <Text>No alert found</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}