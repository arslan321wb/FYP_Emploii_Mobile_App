import React from "react";
import { INavigationProps } from "../../../interfaces/navigation";
import { Text, SafeAreaView, TouchableOpacity ,Alert,ToastAndroid} from "react-native";
import { View } from "native-base";
import style from "../../../globalStyle";
import IonIcon from "react-native-vector-icons/AntDesign";
import QRCodeScanner from 'react-native-qrcode-scanner'

import AsyncStorage from '@react-native-community/async-storage';

export default class Scanner extends React.Component<INavigationProps> {
 
  state: any = {};

  constructor(props:any) {
      super(props);
  
      this.state = {
        qr:false,
        user:[]
      };
    } 
 
 
    onSuccess = async(e:any) => {
      this.setState({qr:false})
      ToastAndroid.showWithGravity(
        "Scanned Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
        var data = {
        job_seeker_id: this.state.usr,
        qr_data: e.rawData
      } 
      await fetch('http://techdino.tk/api/qrcode/set_qrdata',
          {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          }).then(()=>console.log("done"))
             

          .catch((error) => {
              console.warn(error);
          });

      
    };

    temp(user:any){
     let usr:any = (JSON.parse(user))
     
      this.setState({user:usr})
    }

  async  componentDidMount(){
      await AsyncStorage.getItem('user').then((user: any) => {
        this.temp(JSON.parse(user))
       
    })
    }
 
 
 
  render() {
    const {qr} = this.state
      if(qr==false){
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={{ alignItems: "center", padding: 16, width: "100%" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 25,
              marginBottom: 15
            }}
          >
            Scan QR Code
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 20,textAlign:"center" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>

          
            <TouchableOpacity
             onPress={()=>{this.setState({qr:true}),console.log("done")}}
              style={[ { backgroundColor: "#1F9387",height:100,width:100,borderRadius:100/2,justifyContent:"center",alignItems:"center",marginTop:50}]}
             >
              <IonIcon name="qrcode" size={50} color="#fff" />
            </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    )
   }else if(qr==true){
    return(
      <SafeAreaView style={{justifyContent:"center",backgroundColor:"#000000"}}>
              <QRCodeScanner
                          onRead={this.onSuccess}
                         // flashMode={RNCamera.Constants.FlashMode.torch}
                          // topContent={
                          //   <Text style={{}}>
                          //     Go to{' '}
                          //     <Text style={{}}>wikipedia.org/wiki/QR_code</Text> on
                          //     your computer and scan the QR code.
                          //   </Text>
                          // }
                          bottomContent={
                            <TouchableOpacity 
                            onPress={()=>{
                              //@ts-ignore
                              this.setState({qr:false})
                            }}
                            style={{padding:16,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor:"rgb(0,122,255)"}}>
                              <Text style={{color:"#ffffff"}}>Cancel</Text>
                            </TouchableOpacity>
                          }
                          showMarker={true}
                          containerStyle={{marginTop:100,height:300}}
                          
                         
                        />  
            
           

            </SafeAreaView>
    )
  }
  }
}
