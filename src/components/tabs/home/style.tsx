import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    loading: {
        justifyContent: "center",
        marginTop: 10
    },
    container: {
        height: hp(100),
        borderWidth: 0,
        borderColor: 'red',
        padding: 15,
    },
    card: {
        borderBottomWidth: 1,
        borderBottomColor: '#ADACAC',
        height: hp(10),
        width: wp(92),
        marginTop: 10,
    },
    cardTextFieldView: {
        width: wp(70),
        borderWidth: 0,
        // justifyContent: 'space-between',
    },
    colorCircleView: {
        width: wp(22),
        borderWidth: 0,
        padding: 6,
        alignItems: 'flex-end'
    },
    colorCirle: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: 'red',
        opacity: 0.6
    },
    LogoView: {
        borderWidth: 0,
        width: wp(90),
        height: hp(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    searchBarView: {
        borderWidth: 0,
        height: hp(10),
        backgroundColor: 'white',
    }
});