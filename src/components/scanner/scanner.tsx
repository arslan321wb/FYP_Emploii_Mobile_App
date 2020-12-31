import React from "react";
import { INavigationProps } from "../../interfaces/navigation";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import { View } from "native-base";
import style from "../../globalStyle";
import IonIcon from "react-native-vector-icons/AntDesign";
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class ScanPage extends React.Component<INavigationProps> {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ alignItems: "center", padding: 16, width: "100%" }}>
        
        </View>
      </SafeAreaView>
    );
  }
}
