import AsyncStorage from '@react-native-community/async-storage';

class Storage {
    get(key: string) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key).then((resp:any) => {
                if (resp) {
                    resolve(JSON.parse(resp));
                }
                else {
                    reject('item_not_found');
                }
            }, () => {
                reject('item_not_found');
            })
        });
    }

    set(key: string, value: any) {
        return new Promise((resolve, reject) => {
            AsyncStorage.setItem(key, JSON.stringify(value)).then(() => {
                resolve();
            });
        })
    }
}

const StorageService = new Storage();
export default StorageService;