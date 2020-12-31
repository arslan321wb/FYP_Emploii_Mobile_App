import React from "react";
import { View, Text, Button } from "native-base";
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import loginStyle from "../../globalStyle";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import commonService from "../../services/common";
import { INavigationProps } from "../../interfaces/navigation";
import IonIcons from "react-native-vector-icons/Ionicons";
import jobApi from "../../services/api.service";
import alertService from "../../services/alert";
import StorageService from "../../services/storage";

export default class LoginScreen extends React.Component<INavigationProps> {
  //@ts-ignore
  state: {
    loading?: boolean;
    email?: any;
    password?: any;
    showPassword?: boolean;
  } = {};
  constructor(prop: any) {
    super(prop);
    this.state = {
      loading: false,
      email: "murad@recmail.net",
      password: "123456",
      showPassword: true
    };
  }
  render() {
    return (
      <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#1F9387" }}>
        <ScrollView scrollEnabled={false} style={styles.scrollView}>
          <View style={styles.body}>
            <View style={loginStyle.loginOuter}>
              <ImageBackground
                style={loginStyle.homeLogo}
                source={require("../../assets/updatelogo.jpeg")}
              ></ImageBackground>
            </View>

            <View>
              <TextInput
                style={[loginStyle.customInput, { color: "#fff" }]}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email.toLowerCase()}
                placeholder="Email here"
                autoCompleteType="email"
              />

              <View style={loginStyle.showPasswordOuter}>
                <TextInput
                  style={[loginStyle.customInput, { color: "#fff" }]}
                  value={this.state.password}
                  placeholder="Password here"
                  autoCompleteType="password"
                  secureTextEntry={this.state.showPassword}
                  onChangeText={text => this.setState({ password: text })}
                />
                <IonIcons
                  onPress={() => {
                    this.setState({ showPassword: !this.state.showPassword });
                  }}
                  style={loginStyle.showPasswordEye}
                  name={this.state.showPassword ? "ios-eye" : "ios-eye-off"}
                  color="white"
                  size={22}
                ></IonIcons>
              </View>

              <View style={loginStyle.loginBtnOuter}>
                <TouchableOpacity
                  style={loginStyle.loginBtn}
                  disabled={this.state.loading}
                  onPress={() => this.validateForm()}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="#000" />
                  ) : (
                    <Text style={[loginStyle.textColor,{color:"black"}]}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "flex-end", marginTop: 15,marginBottom:20 }}>
                <Text style={loginStyle.textColor}>Forgot Password?</Text>
              </View>

              <TouchableOpacity
                style={{ alignItems: "center", marginTop: 20 }}
                onPress={() => this.props.navigation.navigate("signup")}
              >
                <Text style={loginStyle.textColor}>Dont have an Account? Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  validateForm() {
    if (!commonService.ValidateEmail(this.state.email)) {
      commonService.showMessage("Please enter valid email address");
      return;
    } else if (this.state.password.length == 0) {
      commonService.showMessage("Please enter password");
      return;
    } else {
      this.setState({ loading: true });
      jobApi.post(
        "user/login",
        `email=${this.state.email}&pass=${this.state.password}`,
        (resp: any) => {
          if (resp && resp.error) {
            this.setState({ loading: false });
            alertService.show("Invalid User credantials!");
          } else if (!resp.error) {
            StorageService.set("user", JSON.stringify(resp.response)).then(
              () => {
                  this.props.navigation.navigate("Reviews");
                
                this.setState({ loading: false });
              }
            );
          }
        }
      );
    }
    // alert(JSON.stringify(_state));
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // overflow: 'hidden'
  },
  body: {
    // backgroundColor: Colors.white,
    padding: 16
  }
});
