import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import TweetCard from "../Screens/TweetCard";
import CommentCard from "../Screens/CommentCard";
import { colors } from "../Styles/GlobalStyles";

const API_URL = "http://192.168.1.6:1337";

const CommentsScreen = ({ route }) => {
  const { post, currentUserProfile } = route.params;
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // =========================
  // FETCH COMMENTS
  // =========================
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/comments?filters[post][documentId][$eq]=${post.documentId}&populate[profile][populate]=avatar&sort=createdAt:asc`
      );

      setComments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // =========================
  // SEND COMMENT
  // =========================
const submitComment = async () => {
  if (!text.trim()) return;

  try {
    await axios.post(`${API_URL}/api/comments`, {
      data: {
        Text: text,          // ← CORRECTO: T mayúscula
        post: post.documentId,
        profile: currentUserProfile,
      },
    });

    setText("");
    fetchComments(); // recargar
  } catch (error) {
    console.error("Error sending comment:", error.response?.data || error.message);
  }
};

  // =========================
  // RENDER COMMENT WITH COMMENTCARD ❤️
  // =========================
const renderItem = ({ item }) => {
  const data = item.attributes || item; // Strapi v4 support

  const profile = data.profile?.data?.attributes || data.profile || {};
  const avatarUrl =
    profile.avatar?.data?.attributes?.url
      ? `${API_URL}${profile.avatar.data.attributes.url}`
      : profile.avatar?.url
      ? `${API_URL}${profile.avatar.url}`
      : null;

  const name = profile.name || "User";
  const username = profile.user?.username || "@anon";

  // 👇 AQUI VIENE LA SOLUCIÓN
  const content =
    data.Text !== undefined ? data.Text :      // <--- ESTA ES LA CLAVE
    data.text !== undefined ? data.text :
    data.comment !== undefined ? data.comment :
    data.content !== undefined ? data.content :
    "";

  return (
    <CommentCard
      name={name}
      username={username}
      avatar={avatarUrl}
      content={content}
      createdAt={data.createdAt}
    />
  );
};
  // =========================
  // TWEETCARD VALUES
  // =========================
  const profile = post.profile || {};
  const name = profile.name || "Usuario";
  const username = profile.user?.username || "@anon";
  const avatar = profile.avatar?.url ? `${API_URL}${profile.avatar.url}` : null;
  const image = post.image || null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      {/* POST PRINCIPAL */}
      <TweetCard
        name={name}
        username={username}
        content={post.content}
        createdAt={post.createdAt}
        avatar={avatar}
        image={image}
      />

      {/* LISTA DE COMENTARIOS */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.documentId}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 130 }}
      />

      {/* INPUT */}
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          borderTopWidth: 1,
          borderColor: colors.lightGray,
          backgroundColor: colors.background,
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Escribe un comentario..."
          placeholderTextColor={colors.darkGray}
          style={{
            flex: 1,
            color: colors.text,
            padding: 12,
            backgroundColor: colors.lightGray,
            borderRadius: 12,
            marginRight: 10,
          }}
        />

        <TouchableOpacity
          onPress={submitComment}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;