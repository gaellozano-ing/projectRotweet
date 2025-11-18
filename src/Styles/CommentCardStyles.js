import { StyleSheet } from "react-native";
import { colors, spacing, fontSizes } from "../Styles/GlobalStyles";

export default StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
    backgroundColor: colors.gray,
  },

  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    marginRight: spacing.sm,
  },

  name: {
    fontSize: fontSizes.medium,
    fontWeight: "600",
    color: colors.text,
  },

  username: {
    fontSize: fontSizes.small,
    color: colors.darkGray,
  },

  content: {
    marginTop: spacing.xs,
    fontSize: fontSizes.medium,
    color: colors.text,
  },

  time: {
    marginTop: spacing.sm,
    fontSize: fontSizes.small,
    color: colors.gray,
  },
});
