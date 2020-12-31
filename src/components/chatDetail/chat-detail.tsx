import React from "react";
import { INavigationProps } from "../../interfaces/navigation";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { View } from "native-base";
import { IChats, IUser, IChatMessage } from "../../interfaces/common";
import StorageService from "../../services/storage";
import jobApi from "../../services/api.service";
import chatViewStyle from "./style";
import AntDesign from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import alertService from "../../services/alert";

export default class ChatDetailPage extends React.Component<INavigationProps> {
  state: {
    user: IUser;
    chat: IChats;
    isLoading?: boolean;
    messages: IChatMessage[];
    height: any;
    messageText: string;
  } = {
    chat: {},
    isLoading: true,
    messages: [],
    user: {},
    height: 0,
    messageText: ""
  };
  myTextInput: any;
  scrollView: any;
  interval: any;
  constructor(props: any) {
    super(props);
    this.myTextInput = React.createRef();
    this.state.chat = this.props.navigation.getParam("chat");
  }

  componentDidMount() {
    StorageService.get("user").then((resp: any) => {
      let _user: IUser = JSON.parse(resp);
      this.setState({ user: _user });
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.getChats(_user);
        }, 10000);
      }
    });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          flex: 1
        }}
        keyboardVerticalOffset={40}
      >
        <View style={chatViewStyle.container}>
          <View
            style={{
              justifyContent: "flex-end",
              height: "92%",
              overflow: "hidden"
            }}
          >
            <View style={{ padding: 7 }}>
              {this.state.isLoading ? (
                <ActivityIndicator
                  style={{ marginTop: 15 }}
                ></ActivityIndicator>
              ) : (
                <FlatList
                  style={{ height: "100%" }}
                  showsVerticalScrollIndicator={false}
                  data={this.state.messages}
                  ref={ref => {
                    this.scrollView = ref;
                  }}
                  onContentSizeChange={() =>
                    this.scrollView.scrollToEnd({ animated: true })
                  }
                  ListEmptyComponent={({ item }) => (
                    <Text style={{ marginTop: 15, textAlign: "center" }}>
                      No message found!
                    </Text>
                  )}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        maxWidth: "100%",
                        paddingBottom: 4,
                        marginTop: 4,
                        alignItems:
                          item.sent_from == "employer"
                            ? "flex-start"
                            : "flex-end"
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "column",
                          backgroundColor:
                            item.sent_from == "employer"
                              ? "#262D31"
                              : "#1F9387",
                          width: "60%",
                          padding: 10,
                          borderRadius: 6
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: "#fff"
                          }}
                        >
                          {item.message}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: "#fff",
                            marginTop: 2,
                            textAlign:
                              item.sent_from == "employer" ? "left" : "right"
                          }}
                        >
                          {item.sent_on}
                        </Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => item.chat_id}
                />
              )}
            </View>
            <View
              style={[
                chatViewStyle.inputView,
                { alignItems: "center", justifyContent: "space-between" }
              ]}
            >
              <TextInput
                style={[
                  chatViewStyle.inputStyle,
                  { height: Math.max(35, this.state.height) }
                ]}
                placeholder={"  Message..."}
                value={this.state.messageText}
                onChangeText={text => {
                  this.setState({ messageText: text });
                }}
                multiline={true}
                scrollEnabled
                onContentSizeChange={event => {
                  this.setState({
                    height: event.nativeEvent.contentSize.height
                  });
                }}
                ref={this.myTextInput}
              />

              <TouchableOpacity
                onPress={() => {
                  this.sendMessage();
                }}
              >
                <AntDesign
                  name="send"
                  color="#1F9387"
                  size={25}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  sendMessage() {
    if (this.state.messageText.length == 0) {
      return;
    }

    let messages: IChatMessage[] = this.state.messages;
    let messageText: string = this.state.messageText;
    messages.push({
      chat_id: "",
      employer_name: this.state.messages[0].employer_name,
      jobseeker_name: this.state.messages[0].jobseeker_name,
      message: messageText,
      sent_from: "job_seeker",
      sent_on: moment().format("yyyy-mm-DD hh:mm:ss")
    });
    this.setState({ message: messages, messageText: "" });
    jobApi.post(
      "user/one2one_send",
      `from_user_id=${this.state.user.user_id}&to_user_id=${this.state.chat.employer_id}
      &message=${messageText}&from_job_seeker=true&from_employer=false
      `,
      (resp: any) => {}
    );
  }

  getChats(_user: IUser) {
    jobApi.post(
      "user/one2one_get",
      `my_user_id=${_user.user_id}&other_user_id=${this.state.chat.employer_id}`,
      (resp: any) => {
        if (!resp.error) {
          if (resp && !resp.error && resp.response && resp.response.length) {
            let lastMessageServer: IChatMessage =
              resp.response[resp.response.length - 1];
            let lastMessageLocal: IChatMessage = this.state.messages[
              this.state.messages.length - 1
            ];
            if (lastMessageLocal) {
              if (lastMessageLocal.chat_id == lastMessageServer.chat_id) {
                return;
              }
            }
            this.setState({ isLoading: false, messages: resp.response });
          } else {
            this.setState({ isLoading: false, messages: [] });
          }
        }
      }
    );
  }
}
