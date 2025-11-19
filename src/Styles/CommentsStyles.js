import { StyleSheet } from "react-native";
import { colors } from "./GlobalStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  postContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text,
  },

  username: {
    color: colors.gray,
    fontSize: 14,
  },

  content: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text,
  },

  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginTop: 10,
  },

  commentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 10,
  },

  commentName: {
    fontWeight: "bold",
    color: colors.text,
  },

  commentText: {
    color: colors.text,
    marginTop: 2,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: colors.gray,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },

  input: {
    flex: 1,
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: colors.text,
  },

  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
    marginLeft: 10,
  },

  sendText: {
    color: "white",
    fontWeight: "bold",
  },
});
