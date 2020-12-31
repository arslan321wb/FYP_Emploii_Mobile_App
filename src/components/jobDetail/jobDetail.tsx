import React from "react";
import { View, Text } from "native-base";
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Linking
} from "react-native";

import { INavigationProps } from "../../interfaces/navigation";
import jobApi from "../../services/api.service";
import StorageService from "../../services/storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import commonService from "../../services/common";
import { ICompany, IJobs } from "../../interfaces/common";

export default class JobDeatils extends React.Component<INavigationProps> {
  //@ts-ignore
  state: { job: IJobs; company: ICompany } = {};
  constructor(prop: any) {
    super(prop);
    console.log("job deatils: ", this.props.navigation.getParam("job"));
    this.state.job = this.props.navigation.getParam("job");
    this.getCompanyDetail();
  }

  render() {
    return (
      <View>
        <StatusBar />
        <SafeAreaView style={{ minHeight: "100%" }}>
          <ScrollView>
            <View style={{ padding: 16 }}>
              <View
                style={{
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.3,
                  paddingBottom: 15,
                  marginBottom: 15
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    {this.state.job.job_title}
                  </Text>
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontSize: 13,
                      color: this.state.job.sts == "active" ? "green" : "red"
                    }}
                  >
                    {this.state.job.sts}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, marginTop: 5 }}>
                  {this.state.job.job_description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text style={{ fontSize: 14 }}>Last date to apply: </Text>
                  <Text style={{ fontSize: 14, marginRight: 5 }}>
                    {this.state.job.last_date}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.3,
                  paddingBottom: 15,
                  marginBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
              >
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={{ height: 110, width: 110, borderRadius: 6 }}
                    source={{
                      uri: `http://techdino.tk/public/uploads/employer/${this.state.job.company_logo}`
                    }}
                  />
                </View>
                {this.state.company ? (
                  <View>
                    <Text
                      style={{ fontSize: 13, fontWeight: "500" }}
                      numberOfLines={1}
                    >
                      {this.state.company.company_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: "#8c8c8",
                        marginTop: 0,
                        marginRight: 120
                      }}
                      numberOfLines={3}
                    >
                      {this.state.company.company_description}
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: "#8c8c8", marginTop: 10 }}
                      numberOfLines={1}
                    >
                      {this.state.company.city} {this.state.company.country}
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: "#8c8c8", marginTop: 0 }}
                    >
                      {this.state.company.no_of_employees} Employees
                    </Text>
                    <Text
                      onPress={() => {
                        // Linking.openURL(this.state.company.company_website)
                      }}
                      style={{
                        fontSize: 11,
                        color: "blue",
                        marginTop: 0,
                        textDecorationLine: "underline"
                      }}
                    >
                      {this.state.company.company_website}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View>
                {this.state.job.applied == "no" ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.applyForJob();
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        fontWeight: "bold",
                        textDecorationLine: "underline"
                      }}
                    >
                      Apply Now
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{ color: "#78226D",textAlign:"center" }}>Already Applied</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  applyForJob() {
    if (this.state.job.applied == "no") {
      this.props.navigation.navigate("applyJob", {
        job: this.state.job
      });
    } else {
      commonService.showMessage("You already apply for this job");
    }
  }

  getCompanyDetail() {
    StorageService.get("user").then((user: any) => {
      let _user = JSON.parse(user);
      jobApi.post(
        "company",
        `user_id=${_user.user_id}&company_slug=${this.state.job.company_slug}`,
        (resp: any) => {
          if (resp && !resp.error) {
            this.setState({ company: resp.response.message.row_company });
            // console.log("this.state.company: ", this.state.company);
          }
        }
      );
    });
  }
}
