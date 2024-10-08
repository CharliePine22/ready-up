import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  addGroupBtn: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    padding: 5,
    borderRadius: 5,
  },
  dashWrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#203949",
  },
  groupListContainer: {
    height: "100%",
  },
  headerRight: {
    marginRight: 10,
  },
  mainContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
});

export default styles;
