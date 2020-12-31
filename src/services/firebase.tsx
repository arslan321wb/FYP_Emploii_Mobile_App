import firebase from '@react-native-firebase/app'
import commonService from "./common";
import { IUploadFile } from "../interfaces/common";

class FirebaseService {

initfirebase(){
  var firebaseConfig = {
    apiKey: "AIzaSyDHt3ucGilWeyZcBiOXBFHkRj0Bmr1lhpc",
    authDomain: "jobpost-9af78.firebaseapp.com",
    projectId: "jobpost-9af78",
    storageBucket: "jobpost-9af78.appspot.com",
    messagingSenderId: "533781069855",
    appId: "1:533781069855:web:845e893b30bc7d700bd52a",
    measurementId: "G-S2FZ74E58C"
  };
  // Initialize Firebase
 let app =  firebase.initializeApp(firebaseConfig);
 console.log('app initialized: ',app)
}


  //#region Storage
  uploadFile(file: any) {
    console.log("file = > ", file);

    // return new Promise((resolve, reject) => {
    //   let _fileName = commonService.getTimeStemp() + ".pdf";
    //   console.log("_fileNameL: ", _fileName);
    //   console.log
    //   var storageRef: any = storage()
    //     .ref()
    //     .child(`CV/${_fileName}`);

    //   console.log("storage = ", storageRef);
    //   storageRef
    //     .put(file.document.path, {
    //       contentType: file.document.mime
    //     })
    //     .then(
    //       (snapshot: any) => {
    //         console.log("response after upload: ", snapshot.downloadURL);
    //         resolve(snapshot.downloadURL);
    //       },
    //       (error: any) => {
    //         console.log("error on rject: ", error);
    //         reject(error);
    //       }
    //     )
    //     .catch((error: any) => {
    //       console.log("error: ", error);
    //       reject(error);
    //     });
    //});
  }
  //#endregion Storage
}

const firebaseService = new FirebaseService();
export default firebaseService;
