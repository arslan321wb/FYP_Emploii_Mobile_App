import React from "react";
import { View } from "native-base";
import {
  ActivityIndicator
} from "react-native";
import { INavigationProps } from "../../interfaces/navigation";
import style from "./style";
import StorageService from "../../services/storage";

export default class IntializingScreenScreen extends React.Component<
  INavigationProps
> {
  //@ts-ignore
  state: { user?: IUser } = {};
  constructor(prop: any) {
    super(prop);
    this.redirectApp();
  }
  render() { 
    return (
      <View style={style.outer}>
        <View style={style.intializingImageOuter}>
          <ActivityIndicator
            style={style.loading}
            size="small"
            color="#e2332b"
          />
        </View>
      </View>
    );
  }

  redirectApp(){
    StorageService.get('user').then((resp:any)=>{
      if(resp){
        this.props.navigation.navigate('tabs');
      }
      else{
        this.props.navigation.navigate('login');
      }
    },()=>{
      this.props.navigation.navigate('login');
    })
  }
}
