import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loginOuter: {
        // flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },

    homeLogo: {
        width: 150,
        height: 150,
        marginBottom:15
    },

    welcomeText: {
        fontSize: 20,
        marginLeft: 15,
        paddingBottom: 4
    },

    loginForm: {
        marginTop: 25,
    },

    centeredView: {
        alignItems: 'center',
        padding: 20,
        justifyContent: "center",
        height: "100%",
        marginBottom: 20,
    },

    iconCenter: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 7
    },

    customInput: {
        width: '100%',
        height: 42,
        borderRadius: 7,
        borderBottomWidth: 1,
        borderColor: "#e6e6e6",
        marginBottom: 15,
        paddingVertical: 10
    },

    loginBtnOuter: {
        textAlign: "center",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    loginBtn: {
        backgroundColor: "#e2332b",
        width: 200,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        marginTop: 20,
    },

    textColor: {
        color: "#fff",
    },

    showPasswordOuter: {
        position: 'relative'
    },

    showPasswordEye: {
        position: 'absolute',
        right: 10,
        marginTop: 15
    }

})