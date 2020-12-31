import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  SafeAreaView,
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
import { RadioButton } from "react-native-paper";
import FilePicker from "../../services/filePicker";
import { IDocument } from "../../interfaces/common";
import firebaseService from "../../services/firebase";
import StorageService from "../../services/storage";
import storage from '@react-native-firebase/storage'

export default class LoginScreen extends React.Component<INavigationProps> {
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
    cv_file?: any;
    pass?: any;
    confirm_password?: any;
    check_textInputChange: boolean;
    secureTextEntry: boolean;
    confirm_secureTextEntry: boolean;
    showConfirmPassword: boolean;
    blob:any;
  } = {};
  attachedFile?: IDocument;

  constructor(prop: any) {
    super(prop);
    this.state = {
      loading: false,
      email: "zeeshan@gmail.com",
      full_name: "Zeeshan",
      gender: "Male",
      dob_day: "1",
      dob_month: "January",
      dob_year: "1994",
      current_address: "Abc xyz",
      city: "Rawalpind",
      mobile_number: "+923456789",
      phone: "+923456789",
      cv_file: "hekk",
      pass: "12345678",
      confirm_password: "12345678",
      check_textInputChange: false,
      secureTextEntry: true,
      confirm_secureTextEntry: true,
      showPassword: true,
      showConfirmPassword: true,
      blob:[]
    };

    jobApi.post("user/countries", "", (resp: any) => {
      if (resp && !resp.error && resp.response) {
        console.log("resp from countries:  ", resp.response);
        this.setState({
          country: resp.response.country_name,
          nationality: resp.response.country_citizen
        });
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#1F9387" }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.body}>
            <View style={loginStyle.loginOuter}>
              <ImageBackground
                style={loginStyle.homeLogo}
                source={require("../../assets/updatelogo.jpeg")}
              ></ImageBackground>
              <Text
                style={[
                  loginStyle.textColor,
                  { fontWeight: "bold", marginTop: -10 }
                ]}
              >
                Register to continue
              </Text>
            </View>

            <View>
              <TextInput
                style={[loginStyle.customInput, loginStyle.textColor]}
                onChangeText={text => this.setState({ full_name: text })}
                value={this.state.full_name}
                placeholder="Full Name"
              />

              <TextInput
                style={[loginStyle.customInput, loginStyle.textColor]}
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email.toLowerCase()}
                placeholder="Email here"
                autoCompleteType="email"
              />

              <TextInput
                style={[loginStyle.customInput, loginStyle.textColor]}
                onChangeText={text => this.setState({ mobile_number: text })}
                value={this.state.mobile_number}
                placeholder="Mobile Number"
                autoCompleteType="tel"
              />

              <TextInput
                style={[loginStyle.customInput, loginStyle.textColor]}
                onChangeText={text => this.setState({ phone: text })}
                value={this.state.phone}
                placeholder="Phone (optional)"
                autoCompleteType="tel"
              />

              <View style={{ alignContent: "center", flexDirection: "row" }}>
                <TextInput
                  style={[
                    [loginStyle.customInput, loginStyle.textColor],
                    { width: "50%" }
                  ]}
                  onChangeText={text => this.setState({ city: text })}
                  value={this.state.city}
                  placeholder="City"
                />
                <TextInput
                  style={[
                    [loginStyle.customInput, loginStyle.textColor],
                    { width: "50%" }
                  ]}
                  onChangeText={text =>
                    this.setState({ current_address: text })
                  }
                  value={this.state.current_address}
                  placeholder="Current Address"
                />
              </View>

              <View style={loginStyle.showPasswordOuter}>
                <TextInput
                  style={[loginStyle.customInput, loginStyle.textColor]}
                  value={this.state.pass}
                  placeholder="Password here"
                  autoCompleteType="password"
                  secureTextEntry={this.state.showPassword}
                  onChangeText={text => this.setState({ pass: text })}
                />
                <IonIcons
                  onPress={() => {
                    this.setState({ showPassword: !this.state.showPassword });
                  }}
                  style={loginStyle.showPasswordEye}
                  name={this.state.showPassword ? "ios-eye" : "ios-eye-off"}
                  size={20}
                  color="#fff"
                ></IonIcons>
              </View>

              <View style={loginStyle.showPasswordOuter}>
                <TextInput
                  style={[loginStyle.customInput, loginStyle.textColor]}
                  value={this.state.confirm_password}
                  placeholder="Confirm Password"
                  autoCompleteType="password"
                  secureTextEntry={this.state.showConfirmPassword}
                  onChangeText={text =>
                    this.setState({ confirm_password: text })
                  }
                />
                <IonIcons
                  onPress={() => {
                    this.setState({
                      showConfirmPassword: !this.state.showConfirmPassword
                    });
                  }}
                  style={loginStyle.showPasswordEye}
                  name={
                    this.state.showConfirmPassword ? "ios-eye" : "ios-eye-off"
                  }
                  size={20}
                  color="#fff"
                ></IonIcons>
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
                    color="#fff"
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
                    color="#fff"
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

              <TouchableOpacity
                style={{
                  marginTop: 5,
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                onPress={() => this.uploadDocument()}
              >
                <Text>Click here to Upload CV</Text>
                <IonIcons name="chevron-forward" size={18}></IonIcons>
              </TouchableOpacity>

              <View style={loginStyle.loginBtnOuter}>
                <TouchableOpacity
                  style={[loginStyle.loginBtn, { marginTop: 35 }]}
                  disabled={this.state.loading}
                  onPress={() => this.validateForm()}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="small" color="#000" />
                  ) : (
                    <Text>Sign up</Text>
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ alignItems: "center", marginTop: 20 }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={loginStyle.textColor}>
                  Already have an Account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  uploadDocument() {
    FilePicker.browseDocument(async(file: any) => {
      this.attachedFile = {
        path: file.uri,
        name: file.name,
        filename: file.name,
        mime: file.type,
        type: "pdf"
      };
      //@ts-ignore
      const response = await fetch(this.attachedFile.path);
      let blob = await response.blob();

      this.setState({blob:blob})
      // let temp : any = JSON.stringify(blob)
      // console.log("blob=>"+temp)
        // this.uploadFile(blob)
        // .then(
        // url => {
        //   this.setState({ cv_file: url });
        //   console.log(url)
        // },
        //   () => {}
        // );
    });
  }


  uploadFile = (file:any) =>{
    return new Promise((resolve, reject) => {
      console.log("file=>"+file._data.blobId)
      let _fileName = commonService.getTimeStemp() + ".pdf";
      const reference = storage().ref(`CV/${_fileName}`);
      
      const task =  reference.putString(file._data.blobId)//.then(()=>console.log("done")).catch((e:any)=>console.log("error"+e))
      task.on('state_changed',taskSnapshot => {
        //@ts-ignore TS2339
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${task.totalBytes}`);
        //console.log(taskSnapshot)
        });
        task.then( async() => {
          // console.log('Image uploaded to the bucket!');
           //console.log('imageUpload ==>',name)
          await storage().ref(`CV/${_fileName}`).getDownloadURL().then((url)=>{
           resolve(url)
           console.log("url after download=>"+url)
          })
          
           //console.log('url=' , url)
           
          // return(url)
           //resolve(url)
         })
       })
  }

 async validateForm() {
    if (this.state.full_name.length == 0) {
      commonService.showMessage("Please enter your name");
      return;
    } else if (!commonService.ValidateEmail(this.state.email)) {
      commonService.showMessage("Please enter valid email address");
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
    } else if (this.state.pass.length < 6) {
      commonService.showMessage("Password length must be 6 characters");
      return;
    } else if (this.state.pass != this.state.confirm_password) {
      commonService.showMessage("Password and confirm password must be same");
      return;
    } else if (this.state.blob==[]) {
      commonService.showMessage("Please upload cv");
      return;  
    } else {
      this.setState({ loading: true });
      const url = await this.uploadFile(this.state.blob)
      jobApi.post(
        "user/register",
        `email=${this.state.email}&pass=${this.state.pass}&full_name=${this.state.full_name}&gender=${this.state.gender}
        &dob_day=${this.state.dob_day}&dob_month=${this.state.dob_month}&dob_year=${this.state.dob_year}&current_address=${this.state.current_address}
        &city=${this.state.city}&country=${this.state.country}
        &nationality=${this.state.nationality}&mobile_number=${this.state.mobile_number}
        &phone=${this.state.phone}$cv_file=${url}
        `,
        (resp: any) => {
          console.log("resp of register: ", JSON.stringify(resp));
          this.setState({ loading: false });
          if (resp && resp.error) {
            alertService.show("Error, please try agina later");
          } else if (!resp.error) {
            StorageService.set("user", JSON.stringify(resp.response));
            setTimeout(()=>{
              this.props.navigation.navigate("tabs");
            },1500)
           
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
    // backgroundColor: "#fff",
    padding: 16
  }
});
