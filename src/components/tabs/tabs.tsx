import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import IonIcon from "react-native-vector-icons/AntDesign";

// pages
import Reviews from "./home/home";
import Alerts from "./scanner/scanner";
import ChatList from "./chatListComplete/chatList";
import Profile from "./account-setting/account-settings";

const tabNavigator = createBottomTabNavigator(
  {
    Reviews,
    Alerts,
    ChatList,
    Profile
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        let tabName = navigation.state.routeName;
        if (tabName == "Reviews") {
          return <IonIcon name="home" size={22} />;
        } else if (tabName == "Alerts") {
          return <IonIcon name="qrcode" size={22} />;
        } else if (tabName == "ChatList") {
          return <IonIcon name="wechat" size={22} />;
        } else if (tabName == "Profile") {
          return <IonIcon name="user" size={22} />;
        }
      }
    }),
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveTintColor: "#808184",
      style: {
        // paddingBottom: 2,
        paddingTop: 7,
        height: 55
      }
    }
  }
);

export default createAppContainer(tabNavigator);
