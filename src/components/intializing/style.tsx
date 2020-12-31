import { StyleSheet, Dimensions } from "react-native";


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

export default StyleSheet.create({

    outer: {
        flex:1,
        alignItems: 'center',
        justifyContent: "center",
        height: "100%",
        // backgroundColor:'linear-gradient(to bottom, #e2332b, #d23932, #c23e38, #b1423d, #a04541)'
    },

    intializingImageOuter: {
        alignItems:"center",
        flexDirection:"column",
        width:"100%",
    },

    intialingImage: {
        width: 300,
        height: 120,
    },

    loading:{
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
        marginTop:20
    },
 container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }




})