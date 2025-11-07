import React, { useState } from "react";
import { View, TextInput, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import globalStyles from "../Styles/GlobalStyles";
import CreatePostStyles from "../Styles/CreatePostStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePostScreen = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

const handlePost = async () => {
    if (content.trim() === "") {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("jwt");
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (!token || !user) {
        Alert.alert("Error", "Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://192.168.1.8:1337/api/posts",
        {
          data: {
            content: content,
            profile: user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Your post has been created successfully!");
      setContent("");
    } catch (error) {
      console.error(" Error creating post:", error.response?.data || error.message);
      Alert.alert("Error", "There was a problem creating your post.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={[globalStyles.container, CreatePostStyles.container]}>
      <Text style={[globalStyles.titleText, CreatePostStyles.title]}>
        Create Post
      </Text>

      <TextInput
        placeholder="What's happening?"
        value={content}
        onChangeText={setContent}
        multiline
        style={CreatePostStyles.input}
      />

      <TouchableOpacity
        style={CreatePostStyles.button}
        onPress={handlePost}
        disabled={loading}
      >
        <Text style={CreatePostStyles.buttonText}>
          {loading ? "Posting..." : "Post"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostScreen;
