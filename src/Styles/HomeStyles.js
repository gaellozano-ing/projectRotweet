import { StyleSheet } from "react-native";
import {colors, spacing} from "../Styles/GlobalStyles"
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
  title: {
    marginBottom: 10,
    color: colors.darkGray,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    color: colors.darkGray,
  },
  button: {
    borderRadius: 30,
    marginTop: spacing.md,
  },
});
