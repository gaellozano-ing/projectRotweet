import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logo: {
    width: 40,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
