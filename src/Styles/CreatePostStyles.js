import { StyleSheet } from "react-native";
import { colors, spacing, fontSizes } from "./GlobalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  input: {
    backgroundColor: "white",
    padding: spacing.md,
    borderRadius: 12,
    fontSize: fontSizes.medium,
    marginBottom: spacing.sm,
    minHeight: 120,
    textAlignVertical: "top",
  },

  counter: {
    textAlign: "right",
    color: colors.gray,
    fontSize: fontSizes.small,
    marginBottom: spacing.md,
  },

  button: {
    paddingVertical: spacing.sm,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: spacing.md,
  },

  buttonText: {
    color: "white",
    fontSize: fontSizes.medium,
    fontWeight: "bold",
  },

  imagePreviewContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: "hidden",
    position: "relative",
  },

  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  removeImageButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
