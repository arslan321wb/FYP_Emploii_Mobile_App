import React from "react";
import { INavigationProps } from "../../../interfaces/navigation";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image
} from "react-native";
import { View } from "native-base";
import style from "../../../globalStyle";
import IonIcon from "react-native-vector-icons/AntDesign";
import StorageService from "../../../services/storage";
import { IUser, IChats } from "../../../interfaces/common";
import jobApi from "../../../services/api.service";
import IonIcons from "react-native-vector-icons/Ionicons";

export default class ChatListPage extends React.Component<INavigationProps> {
  state: { chats: IChats[]; isLoading?: boolean } = {
    chats: [],
    isLoading: true
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    StorageService.get("user").then((resp: any) => {
      let _user: IUser = JSON.parse(resp);
      this.getChats(_user);
    });
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ padding: 16, width: "100%" }}>
          {this.state.isLoading ? (
            <ActivityIndicator style={{ marginTop: 15 }}></ActivityIndicator>
          ) : (
            <FlatList
              style={{ height: "100%" }}
              showsVerticalScrollIndicator={false}
              data={this.state.chats}
              ListEmptyComponent={({ item }) => (
                <Text style={{ marginTop: 15, textAlign: "center" }}>
                  No message found!
                </Text>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("chat-detail", {
                      chat: item
                    });
                  }}
                  style={{
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 0.3,
                    paddingBottom: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:"space-between",
                    marginTop: 15
                  }}
                >
                  <View style={{flexDirection: "row",
                    alignItems: "center",}}>
                    <View style={{ marginRight: 10 }}>
                      <Image
                        style={{ height: 60, width: 60, borderRadius: 60 / 2 }}
                        source={require("../../../assets/img/profile.png")}
                      />
                    </View>
                    <View style={{ maxWidth: "80%" }}>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <Text
                          style={{ fontSize: 13, fontWeight: "500" }}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        style={{ fontSize: 11, color: "#8c8c8c", marginTop: 7 }}
                        numberOfLines={2}
                      >
                        {item.last_message}
                      </Text>
                    </View>
                  </View>
                  <IonIcons name="chevron-forward" size={18}></IonIcons>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.employer_id}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }

  getChats(_user: IUser) {
    this.setState({ isLoading: true });
     jobApi.post(
       "user/one2one_users",
       `my_user_id=${_user.user_id}&my_status=jobseeker`,
       (resp: any) => {
         if (!resp.error) {
           console.log("resp.response.message.row: ", resp.response);
           if (resp && !resp.error) {
            this.setState({ isLoading: false, chats: resp.response });

           } else {
           }
         }
         }
       );
  }
}
