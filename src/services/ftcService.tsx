// import { FTC } from '../models/fts';
// import StorageService from './storage';
// import { IUser } from '../interfaces/common';

// class FTCService {
//   static ftc: FTC;

// init() {
//   return new Promise((resolve, reject) => {
//     StorageService.get("ftc").then((info) => {
//       FTCService.ftc = new FTC(info);
//       resolve(FTCService.ftc);
//     }, (error) => {
//       FTCService.ftc = new FTC({
//         isNumberVerified: false,
//         isApproved: false,
//         isLoggedIn: false
//       });
//       resolve(FTCService.ftc);
//     });
//   });
// }

// set(fields: IUser) {
//   return new Promise((resolve, reject) => {
//     let values = FTCService.ftc;

//     for (let f in fields) {
//       values[f] = fields[f];
//     }
//     FTCService.ftc = values;
//     StorageService.set("ftc", values).then((resp) => {
//       resolve("ok");
//     }, () => {
//       console.log("error in setting");
//       reject();
//     });
//   });
// }

// get() {
//   // console.log("this._business in get ==>" + JSON.stringify(BusinessService._business));
//   return FTCService.ftc;
// }

// }


// const FTCServices = new FTCService();
// export default FTCServices;