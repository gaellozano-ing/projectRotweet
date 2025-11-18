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

  // === CONTENEDOR ROW (avatar + contenido)
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
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

  textContainer: {
    flex: 1,
  },

  // === NUEVA LÍNEA: nombre + @username + fecha ===
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },

  name: {
    fontSize: fontSizes.medium,
    fontWeight: "600",
    color: colors.text,
    marginRight: 4,
  },

  username: {
    fontSize: fontSizes.small,
    color: colors.darkGray,
    marginRight: 4,
  },

  date: {
    fontSize: fontSizes.small,
    color: colors.gray,
  },

  // === TEXTO DEL COMENTARIO ===
  commentText: {
    marginTop: spacing.xs,
    fontSize: fontSizes.medium,
    color: colors.text,
  },
});