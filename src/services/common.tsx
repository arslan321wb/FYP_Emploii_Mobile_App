
import { Toast } from 'native-base';
import StorageService from './storage';
import moment from 'moment';


class CommonService {
    ValidateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    showMessage(message: string) {
        Toast.show({
            text: message,
            position: "bottom",
            duration: 3000,
            textStyle: { fontSize: 12 }
        });
    }

    Capitalize(str:string) {
        return str.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    asyncLoop(iterations: number, func: Function, callback?: Function) {
        var index = 0;
        var done = false;
        var loop = {
            next: function () {
                if (done) {
                    return;
                }
                if (index < iterations) {
                    index++;
                    func(loop);
                } else {
                    done = true;
                    if (callback) { callback("finish"); }
                }
            },
            iteration: function () {
                return index - 1;
            },
            break: function () {
                done = true;
                if (callback) { callback("break"); }
            }
        };
        loop.next();
        return loop;
    }

    isDisposableEmail(email: string) {
        let spamEmails: string[] = [
            "guerrillamail",
            "getairmail",
            "dispostabl",
            "fakeinbox",
            "10minutemail",
            "jetable",
            "burnthespam",
            "yopmail",
            "spamgourmet",
            "deadaddress",
            "e4ward",
            "eyepaste",
            "fakemailgenerator",
            "shitmail",
            "mailcatch",
            "mailexpire",
            "mailimate",
            "nospammers",
        ];
        email = email.toLowerCase();
        var hostName = email.substring(email.lastIndexOf("@") + 1);
        hostName = hostName.split(".")[0];
        return spamEmails.includes(hostName) ? true : false;
    }


    getTimeStemp() {
        let date = new Date();
        return (date.getTime());
    }

    apiErrorMessage(err?: string) {
        console.log('Error in procedding: ', err);
        this.showMessage('Error. Please try again later');
    }
}

const commonService = new CommonService();
export default commonService;