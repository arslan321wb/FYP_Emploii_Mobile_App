import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Pages
// import tabNavigator from '../components/tabs/tabs';

import IntializingScreenScreen from "../components/intializing/intializing";
import loginPage from "../components/login/login";
import signupPage from "../components/signup/signup";
import tabNavigator from "../components/tabs/tabs";
import JobDeatils from "../components/jobDetail/jobDetail";
import applyJob from "../components/applyJob/applyJob";
import mySkills from "../components/skills/skills";
import updatePassowrd from "../components/updatePassword/updatePassword";
import alertsPage from "../components/alerts/alerts";
import updateProfilePage from "../components/update-profile/updateprofile";
import ChatDetailPage from "../components/chatDetail/chat-detail";
import ChatListPage from "../components/tabs/chatListComplete/chatList";
import HomePage from '../components/tabs/home/home';

const MainNavigator = createStackNavigator(
  {
    Intializing: {
      screen: IntializingScreenScreen,
      navigationOptions: {
        gestureEnabled: false,
        header: () => {
          false;
        }
      }
    },
    HomeTab: {
      screen: HomePage,
      navigationOptions: {
        gestureEnabled: false,
        header: () => {
          false;
        }
      }
    },
    login: {
      screen: loginPage,
      navigationOptions: {
        gestureEnabled: false,
        header: () => {
          false;
        }
      }
    },
    signup: {
      screen: signupPage,
      navigationOptions: {
        gestureEnabled: true,
        header: () => {
          false;
        }
      }
    },

    tabs: {
      screen: tabNavigator,
      navigationOptions: {
        gestureEnabled: false,
        // headerTitle:"FTC",
        header: () => {}
      }
    },
    "job-detail": {
      screen: JobDeatils,
      navigationOptions: {
        headerTitle: "Job Detail",
        headerBackTitle: false
      }
    },
    applyJob: {
      screen: applyJob,
      navigationOptions: {
        headerTitle: "Apply for Job",
        headerBackTitle: false
      }
    },
    skills: {
      screen: mySkills,
      navigationOptions: {
        headerTitle: "Skills",
        headerBackTitle: false
      }
    },
    "update-password": {
      screen: updatePassowrd,
      navigationOptions: {
        headerTitle: "Change Password",
        headerBackTitle: false
      }
    },
    alerts: {
      screen: alertsPage,
      navigationOptions: {
        headerTitle: "Alerts",
        headerBackTitle: false
      }
    },
    "update-profile": {
      screen: updateProfilePage,
      navigationOptions: {
        headerTitle: "Profile",
        headerBackTitle: false
      }
    },
    "chat-detail": {
      screen: ChatDetailPage,
      navigationOptions: {
        headerTitle: "",
        headerBackTitle: false
      }
    },
    "chat-list": {
      screen: ChatListPage,
      navigationOptions: {
        headerTitle: "Chats",
        headerBackTitle: false
      }
    }
  },
  {
    headerMode: "screen",
    initialRouteName: "Intializing"
  }
);

const AppNavigation = createAppContainer(MainNavigator);
export default AppNavigation;

// navigationOptions: {
//     gesturesEnabled: false,
//     title: 'Verify Code',
//     headerTintColor: "#fff",
//     headerStyle: {
//         backgroundColor: "#3f51b5"
//     },
//     headerLeft: () => null,
//     headerTitleAlign: "center"
// }
