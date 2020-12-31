import React from "react";
import { INavigationProps } from "../../../interfaces/navigation";
import { View } from "native-base";
import { Text, SafeAreaView, Image } from "react-native";
import { IUser } from "../../../interfaces/common";
import StorageService from "../../../services/storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import IonIcons from "react-native-vector-icons/Ionicons";
import alertService from "../../../services/alert";

export default class AccountSettins extends React.Component<INavigationProps> {
  state: { user: IUser } = {
    user: {}
  };
  constructor(prop: any) {
    super(prop);
    this.state = {user:{first_name:'',last_name:'',email:'',mobile:''}}
  }


  componentDidMount(){
  }

  render() {
    StorageService.get("user").then((resp: any) => {
      // alertService.show('user: ' +resp)
      this.setState({ user: JSON.parse(resp) });
    }).catch(()=>{
      this.setState({user:{photo:'',name:'',first_name:'',last_name:'', }})
    });
const {user}=this.state;
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ padding: 16 }}>
          <View
            style={{ 
              paddingVertical: 20,
              paddingHorizontal: 16,
              borderBottomColor: "#ccc",
              borderBottomWidth: 0.3,
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View style={{ marginRight: 15 }}>
              <Image
                style={{ height: 80, width: 80, borderRadius: 80 / 2 }}
                source={{
                  uri: `http://techdino.tk/public/uploads/candidate/thumb/${this.state.user && this.state.user.photo?this.state.user.photo:''}`
                  // uri:"https://i0.wp.com/kashmir.today/wp-content/uploads/2020/06/Dirilis-Ertugal_20200603-215356_1.jpg?fit=1065%2C1087&ssl=1"
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {user &&user.first_name?user.first_name:''} {user&&user.last_name?user.last_name:''}
              </Text>
              <Text style={{ fontSize: 12 }}>{user&&user.email ? user.email:''}</Text>
              <Text style={{ fontSize: 10 }}>{user&&user.mobile ?user.mobile:""}</Text>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 0.3,
                marginBottom: 15,
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onPress={() => {
                this.props.navigation.navigate("update-profile");
              }}
            >
              <Text>Update Profile</Text>
              <IonIcons name="chevron-forward" size={18}></IonIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 0.3,
                marginBottom: 15,
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onPress={() => this.props.navigation.navigate("update-password")}
            >
              <Text>Update Password</Text>
              <IonIcons name="chevron-forward" size={18}></IonIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 0.3,
                marginBottom: 15,
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onPress={() => {
                this.props.navigation.navigate("skills");
              }}
            >
              <Text>Skills</Text>
              <IonIcons name="chevron-forward" size={18}></IonIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomColor: "#ccc",
                borderBottomWidth: 0.3,
                marginBottom: 15,
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onPress={() => {
                this.props.navigation.navigate("alerts");
              }}
            >
              <Text>Alerts</Text>
              <IonIcons name="chevron-forward" size={18}></IonIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 15,
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
              onPress={() => {
                alertService
                  .confirm("Are you sure you want to signout?", "Signout")
                  .then(isConfirmed => {
                    if (isConfirmed) {
                      StorageService.set("user", null);
                      this.props.navigation.navigate("login");
                    }
                  });
              }}
            >
              <Text>Signout</Text>
              <IonIcons name="chevron-forward" size={18}></IonIcons>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
