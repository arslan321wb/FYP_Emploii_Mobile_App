import React from "react";
import { View, Text, Textarea } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { INavigationProps } from "../../interfaces/navigation";
import jobApi from "../../services/api.service";
import StorageService from "../../services/storage";
import {
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native-gesture-handler";
import commonService from "../../services/common";
import { IUser, ISKill } from "../../interfaces/common";
import style from "./updatePasswordStyle";
import IonIcons from "react-native-vector-icons/Ionicons";
import alertService from "../../services/alert";
import { ActivityIndicator } from "react-native-paper";

export default class updatePassowrd extends React.Component<INavigationProps> {
  //@ts-ignore
  state: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    user: IUser;
    showOldPassword: boolean;
    showNewPassword: boolean;
    showConfirmPassword: boolean;
    isUpadting: boolean;
  } = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showNewPassword: false,
    showOldPassword: false,
    showConfirmPassword: false,
    isUpadting: false
  };

  constructor(prop: any) {
    super(prop);
    StorageService.get("user").then((user: any) => {
      this.state.user = JSON.parse(user);
    });
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#fff" }}>
          <View style={{ padding: 16 }}>
            <View style={style.showPasswordOuter}>
              <TextInput
                style={style.customInput}
                autoCompleteType="password"
                secureTextEntry={!this.state.showOldPassword}
                onChangeText={text => this.setState({ oldPassword: text })}
                value={this.state.oldPassword}
                placeholder="Enter old password"
              />
              <IonIcons
                onPress={() => {
                  this.setState({
                    showOldPassword: !this.state.showOldPassword
                  });
                }}
                style={style.showPasswordEye}
                name={!this.state.showOldPassword ? "ios-eye" : "ios-eye-off"}
                size={20}
              ></IonIcons>
            </View>

            <View style={style.showPasswordOuter}>
              <TextInput
                style={style.customInput}
                autoCompleteType="password"
                secureTextEntry={!this.state.showNewPassword}
                onChangeText={text => this.setState({ newPassword: text })}
                value={this.state.newPassword}
                placeholder="Enter new password"
              />
              <IonIcons
                onPress={() => {
                  this.setState({
                    showNewPassword: !this.state.showNewPassword
                  });
                }}
                style={style.showPasswordEye}
                name={!this.state.showNewPassword ? "ios-eye" : "ios-eye-off"}
                size={20}
              ></IonIcons>
            </View>

            <View style={style.showPasswordOuter}>
              <TextInput
                style={style.customInput}
                autoCompleteType="password"
                secureTextEntry={!this.state.showConfirmPassword}
                onChangeText={text => this.setState({ confirmPassword: text })}
                value={this.state.confirmPassword}
                placeholder="Enter confirm password"
              />
              <IonIcons
                onPress={() => {
                  this.setState({
                    showConfirmPassword: !this.state.showConfirmPassword
                  });
                }}
                style={style.showPasswordEye}
                name={
                  !this.state.showConfirmPassword ? "ios-eye" : "ios-eye-off"
                }
                size={20}
              ></IonIcons>
            </View>

            <View style={{ alignItems: "center", marginTop: 15 }}>
              {this.state.isUpadting ? (
                <ActivityIndicator color="#000"></ActivityIndicator>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.addSkill();
                  }}
                >
                  <Text
                    style={{
                      marginTop: 5,
                      fontWeight: "bold",
                      textDecorationLine: "underline"
                    }}
                  >
                    Update Password
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  addSkill() {
    if (this.state.oldPassword.length < 6) {
      commonService.showMessage("Enter valid old password");
    } else if (this.state.newPassword.length < 6) {
      commonService.showMessage("New password should be atleast 6 characters");
    } else if (this.state.newPassword != this.state.confirmPassword) {
      commonService.showMessage(
        "New password and confirm password must be same"
      );
    } else {
      this.setState({isUpadting:true});
      jobApi.post(
        "my_account/change_password",
        `user_id=${this.state.user.user_id}&old_password=${this.state.oldPassword}&new_password=${this.state.newPassword}&confirm_password=${this.state.confirmPassword}`,
        (resp: any) => {
          // console.log("resp of update password: ", resp);
          this.setState({isUpadting:false});
          if (resp && !resp.error) {
            commonService.showMessage("Password updated successfully");
            this.setState({
              newPassword: "",
              oldPassword: "",
              confirmPassword: ""
            });
          } else {
            commonService.showMessage(resp.response.message);
          }
        }
      );
    }
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    marginTop: 15,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});
