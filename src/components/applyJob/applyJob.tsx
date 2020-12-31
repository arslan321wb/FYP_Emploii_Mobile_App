import React from "react";
import { View, Text, Textarea } from "native-base";
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Linking,
  StyleSheet
} from "react-native";
import { INavigationProps } from "../../interfaces/navigation";
import jobApi from "../../services/api.service";
import StorageService from "../../services/storage";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import commonService from "../../services/common";
import { IUser, IJobs } from "../../interfaces/common";
import style from "./applyJobStyle";
import { ActivityIndicator } from "react-native-paper";

export default class JobDeatils extends React.Component<INavigationProps> {
  //@ts-ignore
  state: {
    job: IJobs;
    user: IUser;
    expected_salary?: string;
    cover_letter?: string;
    isAppliying?: boolean;
  } = {};
  constructor(prop: any) {
    super(prop);
    this.state.job = this.props.navigation.getParam("job");
    // console.log("this.state.job: ", this.state.job);
    StorageService.get("user").then((user: any) => {
      this.state.user = JSON.parse(user);
    });
  }

  render() {
    return (
      <View>
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#fff" }}>
          <ScrollView>
            <View style={{ padding: 16 }}>
              <TextInput
                style={style.customInput}
                onChangeText={text => this.setState({ expected_salary: text })}
                value={this.state.expected_salary}
                placeholder="Enter your expected salary here"
                keyboardType="number-pad"
              />
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ cover_letter: text })}
                  value={this.state.cover_letter}
                  placeholder="Cover letter"
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
              <View style={{ alignItems: "center", marginTop: 15 }}>
                {this.state.isAppliying ? (
                  <ActivityIndicator></ActivityIndicator>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.applyForJob();
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: "bold",
                        textDecorationLine: "underline"
                      }}
                    >
                      Apply Now
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  applyForJob() {
    if (!this.state.expected_salary) {
      commonService.showMessage("enter your expected salary");
    } else if (!this.state.cover_letter) {
      commonService.showMessage("enter your cover letter");
    } else {
      this.setState({ isAppliying: true });
      jobApi.post(
        "apply_job",
        `user_id=${this.state.user.user_id}&job_id=${this.state.job.ID}&expected_salary=${this.state.expected_salary}&cover_letter=${this.state.cover_letter}`,
        (resp: any) => {
          console.log("resp of apply: ", resp);
          this.setState({ isAppliying: false });
          if (resp && !resp.error) {
            commonService.showMessage(resp.response.message);
          }
          else{
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
