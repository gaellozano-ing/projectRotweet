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
      `${API_URL}/api/comments?filters[post][documentId][$eq]=${post.documentId}&populate[profile][populate][user]=true&populate[profile][populate][avatar]=true&sort=createdAt:asc`
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
const handleSendComment = async () => {
  try {
  

    if (!currentUserProfile || !currentUserProfile.id) {
      console.log(" currentUserProfile is empty, I cannot submit a comment");
      return;
    }

    const res = await axios.post(`${API_URL}/api/comments`, {
      data: {
        Text: text,              
        post: post.id,
        profile: currentUserProfile.id,
      }
    });

    console.log("✔️ Comentario enviado:", res.data);

    setText("");               
    fetchComments();

  } catch (error) {
    console.log("ERROR SUBMITTING COMMENT:");
    console.log("Error complete:", error);
    console.log("Error response:", error.response?.data);
  }
};
  
const renderItem = ({ item }) => {
  const data = item.attributes || item;

  const profile = data.profile?.data?.attributes || data.profile || {};
  const avatarUrl =
    profile.avatar?.data?.attributes?.url
      ? `${API_URL}${profile.avatar.data.attributes.url}`
      : profile.avatar?.url
      ? `${API_URL}${profile.avatar.url}`
      : null;

  const name = profile.name || "User";
  const username = profile.user?.username || "@anon";

 
  const content =
    data.Text !== undefined ? data.Text :      
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
  const name = profile.name || "User";
  const username = profile.user?.username || "@anon";
  const avatar = profile.avatar?.url ? `${API_URL}${profile.avatar.url}` : null;
  const image = post.image || null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
     
      <TweetCard
        name={name}
        username={username}
        content={post.content}
        createdAt={post.createdAt}
        avatar={avatar}
        image={image}
      />

    
      <FlatList
        data={comments}
        keyExtractor={(item) => item.documentId}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 130 }}
      />

    
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
          placeholder="Write a comment..."
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
          onPress={handleSendComment}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;