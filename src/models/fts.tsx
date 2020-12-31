export class FTC {
    uid?: string
    email?: string
    name?: string
    phoneNumber?: string
    isNumberVerified?: boolean
    isApproved?: boolean
    isLoggedIn?: boolean
    registrationDate?: string
    lastUpdate?: string
    deviceToken?: string
    licenseNumber?: string
    // documents?: IDocument[]
    countryCode?: string
    appVersion?: string
    buildVersion?: string


    // Tariq Variabl
    userId?: string;
    authToken?: string;


    constructor(fields: any) {
        // for (let f in fields) {
        //     this[f] = fields[f];
        // }
    }
}