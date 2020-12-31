import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: "red",
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    width: "100%",
    // paddingRight:5,
    // paddingLeft:5,
    justifyContent: "space-between"
  },

  headerContainer: {
    borderBottomWidth: 3,
    borderColor: "red",
    height: 50,
    paddingBottom: 10,
    justifyContent: "flex-start",
    backgroundColor: "white"
  },
  headerTitle: {
    textAlign: "center",
    // fontFamily: globalFonts.AvenirLTStdBlack ,
    fontSize: 18,
    color: "black"
  },
  inputStyle: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 30,
    // height:37.5,
    width: "85%",
    maxHeight: 100,
    marginLeft: 10,
    // paddingBottom:10,
    // width: '95%',
    // marginTop:-15,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white"
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "#F1F2F4",
    width: "100%",
    borderWidth: 0,
    alignItems: "flex-start",
    paddingTop: 10,
    // height:'15%',
    // height:'10%',
    paddingBottom: 15
    // marginLeft:-10,
    // marginRight:-20,
  },

  ChatView: {
    borderWidth: 0,
    marginTop: 10,
    alignSelf: "flex-end",
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  ChatText: {
    //    fontFamily: globalFonts.AvenirLTStdRoman,
    fontSize: 13,
    color: "black"
  }
});
