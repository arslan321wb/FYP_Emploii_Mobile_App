import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import globalColor from '../../../global/globalColor';

export default StyleSheet.create({
    container: {
        height: hp(100),
        borderWidth: 0,
        borderColor: 'red',
        backgroundColor: '#fff',
        // padding: hp(4),
        // paddingTop: hp(4)
    },
    imageMainView:{
        borderWidth:0,
        height : hp(40),
        paddingTop:hp(6),
        // backgroundColor : globalColor.profile,
        justifyContent:'space-between',
        alignItems:'center'
    },
    imagerRounndView:{
        borderRadius:60,
        backgroundColor: 'white',
        width: 110,
        height: 110,
        // width: wp(25),
        // height:hp(15),
        justifyContent:'center',
        alignItems:'center',
    },
    fieldsMainView:{
        borderWidth:0,
        padding : hp(3)
    },
    fieldView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'lightgray',
        paddingTop: hp(3),
        paddingBottom : hp(2.5),
        paddingLeft : wp(2.5),
        paddingRight : wp(2.5),
        justifyContent:'space-between',
        alignItems:'center'
    }
})