import { Alert } from "react-native";

class AlertsService {
    confirm(message: string, okText?: string) {
        return new Promise((resolve, rject) => {
            Alert.alert(
                '',
                message,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: okText || 'OK', onPress: () => resolve(true) },
                ],
                { cancelable: false },
            );
        });
    }
    
    show(messae:string){
        Alert.alert('',messae);
    } 
}

const alertService = new AlertsService();
export default alertService;