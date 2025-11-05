<<<<<<< HEAD
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './GlobalStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
=======
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
>>>>>>> ac60b45366f729b91d5e3394a822c83ab52239e4
  },
  logo: {
    width: 40,
    height: 50,
    marginRight: 10,
  },
<<<<<<< HEAD
  title: {
    marginBottom: 10,
    fontSize: fontSizes.title,
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
=======
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
>>>>>>> ac60b45366f729b91d5e3394a822c83ab52239e4
  },
});
