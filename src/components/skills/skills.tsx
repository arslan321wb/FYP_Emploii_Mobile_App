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
import style from "./skillsStyle";
import IonIcons from "react-native-vector-icons/Ionicons";
import alertService from "../../services/alert";

export default class mySkills extends React.Component<INavigationProps> {
  //@ts-ignore
  state: {
    skills: ISKill[];
    newSkill: string;
    user: IUser;
  } = {};

  constructor(prop: any) {
    super(prop);
    StorageService.get("user").then((user: any) => {
      this.state.user = JSON.parse(user);
      this.getAllSKills();
    });
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#fff" }}>
          <View style={{ padding: 16 }}>
            <TextInput
              style={style.customInput}
              onChangeText={text => this.setState({ newSkill: text })}
              value={this.state.newSkill}
              placeholder="Enter new skill"
            />
            <View style={{ alignItems: "center", marginTop: 15 }}>
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
                  Add Skill
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              style={{ marginTop: 35 }}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.ID}
              data={this.state.skills}
              renderItem={({ item }) => (
                <View
                  style={{
                    paddingBottom: 15,
                    marginBottom: 15,
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 0.3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ textTransform: "capitalize" }}>
                    {item.skill_name}
                  </Text>
                  <IonIcons
                    onPress={() => {
                      this.deletSkill(item);
                    }}
                    name="ios-trash-outline"
                    color="red"
                    size={18}
                  ></IonIcons>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  deletSkill(_skill: ISKill) {
    alertService
      .confirm("Are you sure you want to delete?", "Delete")
      .then(isConfimed => {
        if (isConfimed) {
          let index = this.state.skills.findIndex((skill: ISKill) => {
            return skill.ID == _skill.ID;
          });
          if (index > -1) {
            this.state.skills.splice(index, 1);
            this.setState({ skills: this.state.skills });
          }
          jobApi.post(
            "user/remove_skills",
            `user_id=${this.state.user.user_id}&skill_id=${_skill.ID}`,
            (resp: any) => {
              if (resp && !resp.error) {
                commonService.showMessage(
                  "Skill has been removed successfully"
                );
              } else {
                // commonService.showMessage(resp.response.message);
              }
            }
          );
        }
      });
  }

  addSkill() {
    if (!this.state.newSkill) {
      commonService.showMessage("Enter skill text");
    } else {
      let index = this.state.skills.findIndex((skill: ISKill) => {
        return (
          skill.skill_name.toLowerCase() == this.state.newSkill.toLocaleLowerCase()
        );
      });
      
      if (index > -1) {
        commonService.showMessage("Skill with same name already entered");
        return;
      }

      jobApi.post(
        "user/add_skills",
        `user_id=${this.state.user.user_id}&skill=${this.state.newSkill}`,
        (resp: any) => {
          if (resp && !resp.error) {
            this.getAllSKills();
            commonService.showMessage("Skill has been added successfully");
            this.setState({newSkill:''});
          } else {
            commonService.showMessage("Error, Please try again later");
          }
        }
      );
    }
  }

  getAllSKills() {
    jobApi.post(
      "user/skills",
      `user_id=${this.state.user.user_id}`,
      (resp: any) => {
        if (resp && !resp.error) {
          this.state.skills = resp.response.message.result;
          this.setState({
            skills: resp.response.message.result
          });
        }
      }
    );
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
