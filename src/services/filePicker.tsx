import DocumentPicker from 'react-native-document-picker';

class filePicker {
    browseDocument(callback?: any) {
        DocumentPicker.pick({
            type: ['application/pdf', 'text/plain', 'public.plain-text', '.pdf', 'com.adobe.pdf']
            // size
        }).then((resp:any) => {
            console.log('resp of pickFile ', resp);
            if (callback && resp) {
                callback(resp);
            }
        }, () => {

        });
    }

}

const FilePicker = new filePicker();
export default FilePicker;