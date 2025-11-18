import React, { useState, useEffect } from "react";
import { View, TextInput, Alert, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import globalStyles from "../Styles/GlobalStyles";
import CreatePostStyles from "../Styles/CreatePostStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePostScreen = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Limit text to 280 characters ---
  useEffect(() => {
    if (content.length > 280) {
      setContent(content.slice(0, 280));
      Alert.alert("Limit reached", "Maximum 280 characters allowed.");
    }
  }, [content]);

  // --- Pick image from gallery ---
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const img = response.assets[0];
          setImage(img);
        }
      }
    );
  };

  // --- Remove selected image ---
  const removeImage = () => {
    setImage(null);
  };

  // --- Create Post ---
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

      // 1) Create post without image first
      const postResponse = await axios.post(
        "http://192.168.1.6:1337/api/posts",
        {
          data: {
            content: content,
            profile: user.id,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const newPostId = postResponse.data?.data?.id;

      // 2) Upload image if exists
      if (image) {
        const formData = new FormData();

        formData.append("files", {
          uri: image.uri,
          name: "post_image.jpg",
          type: image.type || "image/jpeg",
        });

        formData.append("ref", "api::post.post");
        formData.append("refId", newPostId);
        formData.append("field", "image");

        await axios.post("http://192.168.1.6:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      Alert.alert("Success", "Your post has been created!", [
        {
          text: "OK",
          onPress: () => {
            setContent("");
            setImage(null);
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
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

      <Text style={CreatePostStyles.counterText}>{content.length}/280</Text>

      {/* Preview image */}
      {image && (
        <View style={{ marginBottom: 15 }}>
          <Image
            source={{ uri: image.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 12,
              marginBottom: 10,
            }}
          />

          {/* Remove Image button (only visible if there is an image) */}
          <TouchableOpacity
            style={[
              CreatePostStyles.button,
              { backgroundColor: "#ff6b6b", marginBottom: 15 },
            ]}
            onPress={removeImage}
          >
            <Text style={CreatePostStyles.buttonText}>Remove Image</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add image button */}
      <TouchableOpacity
        style={[
          CreatePostStyles.button,
          { backgroundColor: "#ccc", marginBottom: 20 },
        ]}
        onPress={pickImage}
      >
        <Text style={[CreatePostStyles.buttonText, { color: "black" }]}>
          Add Image
        </Text>
      </TouchableOpacity>

      {/* Post button */}
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
