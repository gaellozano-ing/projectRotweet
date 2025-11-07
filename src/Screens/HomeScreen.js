import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Image } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import TweetCard from "../Screens/TweetCard";
import CustomButton from "../Components/CustomButton";
import globalStyles from "../Styles/GlobalStyles";
import HomeStyles from "../Styles/HomeStyles";
import TweetCardStyles from "../Styles/TweetCardStyles";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL =
  "http://192.168.1.6:1337/api/posts?populate[profile][populate][user]=true&populate[profile][populate][avatar]=true&sort=createdAt:desc";

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      const postData = response.data.data || [];
      setPosts(postData);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const content = item?.attributes?.content || item.content || "";
    const profile = item?.attributes?.profile || item.profile;
    const username = profile?.user?.username || profile?.name || "Anonymous";
    const avatar = profile?.avatar?.url
      ? { uri: `http://192.168.1.6:1337${profile.avatar.url}` }
      : null;

    return (
      <TweetCard
      username={username}
      content={content}
      createdAt={item.createdAt}
      avatar={item.profile?.avatar?.url ? `http://192.168.1.6:1337${item.profile.avatar.url}` : null}
/>

    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={HomeStyles.headerContainer}>
        <Image
          source={require("../assets/img/RotTweetLogo.png")}
          style={HomeStyles.logo}
          resizeMode="contain"
        />
        <Text style={HomeStyles.headerText}>Inicio</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ItemSeparatorComponent={() => <View style={TweetCardStyles.separator} />}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>No posts yet</Text>}
        showsVerticalScrollIndicator={false}
      />

      <CustomButton
        icon="feather"
        onPress={() => navigation.navigate("CreatePost")}
        style={HomeStyles.floatingButton}
      />
    </View>
  );
};

export default FeedScreen;
