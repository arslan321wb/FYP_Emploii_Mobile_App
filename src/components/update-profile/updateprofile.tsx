import React from "react";
import { View, Text } from "native-base";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator
} from "react-native";
import { INavigationProps } from "../../interfaces/navigation";
import loginStyle from "../../globalStyle";
import { RadioButton } from "react-native-paper";
import IonIcons from "react-native-vector-icons/Ionicons";
import commonService from "../../services/common";
import jobApi from "../../services/api.service";
import alertService from "../../services/alert";
import StorageService from "../../services/storage";
import { IUser } from "../../interfaces/common";

export default class updateProfilePage extends React.Component<
  INavigationProps
> {
  //@ts-ignore
  state: {
    loading?: boolean;
    email?: any;
    showPassword?: boolean;
    full_name?: any;
    gender?: any;
    dob_day?: any;
    dob_month?: any;
    dob_year?: any;
    current_address?: any;
    city?: any;
    country?: any;
    nationality?: any;
    mobile_number?: any;
    phone?: any;
    user_id: "";
  } = {};

  constructor(prop: any) {
    super(prop);
  }

  componentDidMount() {
    StorageService.get("user").then((resp: any) => {
      let user: IUser = JSON.parse(resp);
      this.setState({
        loading: false,
        user_id: user.user_id,
        email: user.email,
        full_name: user.first_name,
        gender: user.gender,
        dob_day: "1",
        dob_month: "January",
        dob_year: "1994",
        current_address: user.present_address,
        city: user.city,
        mobile_number: user.mobile,
        phone: user.phone,
        country: user.country,
        nationality: user.nationality
      });
    });
  }

  render() {
    return (
      <View>
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#fff" }}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
              <View>
                <TextInput
                  style={[loginStyle.customInput]}
                  onChangeText={text => this.setState({ full_name: text })}
                  value={this.state.full_name}
                  placeholder="Full Name"
                />

                <TextInput
                  style={[loginStyle.customInput]}
                  onChangeText={text => this.setState({ mobile_number: text })}
                  value={this.state.mobile_number}
                  placeholder="Mobile Number"
                  autoCompleteType="tel"
                />

                <TextInput
                  style={[loginStyle.customInput]}
                  onChangeText={text => this.setState({ phone: text })}
                  value={this.state.phone}
                  placeholder="Phone (optional)"
                  autoCompleteType="tel"
                />

                <View style={{ alignContent: "center", flexDirection: "row" }}>
                  <TextInput
                    style={[[loginStyle.customInput], { width: "50%" }]}
                    onChangeText={text => this.setState({ city: text })}
                    value={this.state.city}
                    placeholder="City"
                  />
                  <TextInput
                    style={[[loginStyle.customInput], { width: "50%" }]}
                    onChangeText={text =>
                      this.setState({ current_address: text })
                    }
                    value={this.state.current_address}
                    placeholder="Current Address"
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text>Gender</Text>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: 10
                    }}
                  >
                    <RadioButton
                      value="male"
                      status={
                        this.state.gender === "male" ? "checked" : "unchecked"
                      }
                      onPress={() => this.setState({ gender: "male" })}
                    />
                    <Text onPress={() => this.setState({ gender: "male" })}>
                      Male
                    </Text>
                  </View>
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <RadioButton
                      value="female"
                      status={
                        this.state.gender === "female" ? "checked" : "unchecked"
                      }
                      onPress={() => this.setState({ gender: "female" })}
                    />
                    <Text onPress={() => this.setState({ gender: "female" })}>
                      Female
                    </Text>
                  </View>
                </View>

                <View style={loginStyle.loginBtnOuter}>
                  <TouchableOpacity
                    style={[
                      loginStyle.loginBtn,
                      { marginTop: 35, backgroundColor: "#1F9387" }
                    ]}
                    disabled={this.state.loading}
                    onPress={() => this.validateForm()}
                  >
                    {this.state.loading ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Text style={loginStyle.textColor}>Update</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
  validateForm() {
    if (this.state.full_name.length == 0) {
      commonService.showMessage("Please enter your name");
      return;
    } else if (this.state.mobile_number.length < 9) {
      commonService.showMessage("Please enter valid mobile number");
      return;
    } else if (this.state.city.length == 0) {
      commonService.showMessage("Please enter city");
      return;
    } else if (this.state.current_address.length == 0) {
      commonService.showMessage("Please enter current address");
      return;
    } else {
      this.setState({ loading: true });
      jobApi.post(
        "my_account/update",
        `present_address=${this.state.current_address}&user_id=${this.state.user_id}&email=${this.state.email}&full_name=${this.state.full_name}&gender=${this.state.gender}
        &dob_day=${this.state.dob_day}&dob_month=${this.state.dob_month}&dob_year=${this.state.dob_year}&current_address=${this.state.current_address}
        &city=${this.state.city}&country=${this.state.country}
        &nationality=${this.state.nationality}&mobile_number=${this.state.mobile_number}&&mobile=${this.state.mobile_number}
        &phone=${this.state.phone}`,
        (resp: any) => {
          console.log("resp of my_account/update: ", JSON.stringify(resp));
          this.setState({ loading: false });
          if (resp && resp.error) {
          } else if (!resp.error) {
            commonService.showMessage("Profile has been updated successfully");
            let user: IUser = {
              user_id: this.state.user_id,
              email: this.state.email,
              full_name: this.state.full_name,
              first_name: this.state.full_name,
              gender: this.state.gender,
              dob_day: "1",
              dob_month: "January",
              dob_year: "1994",
              current_address: this.state.current_address,
              present_address: this.state.current_address,
              city: this.state.city,
              mobile_number: this.state.mobile_number, 
              mobile: this.state.mobile_number,
              phone: this.state.phone,
              country: this.state.country,
              nationality: this.state.nationality
            };
            StorageService.set("user", resp.response);
          }
        } 
      );
    }
  }
}

const styles = StyleSheet.create({
  scrollView: {
    // overflow: 'hidden'
  },
  body: {
    // backgroundColor: "#fff",
    padding: 16
  }
});
