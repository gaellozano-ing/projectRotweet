import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import TweetCard from "../Screens/TweetCard";
import CustomButton from "../Components/CustomButton";
import globalStyles from "../Styles/GlobalStyles";
import HomeStyles from "../Styles/HomeStyles";
import TweetCardStyles from "../Styles/TweetCardStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Styles/GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.6:1337";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/posts?populate[profile][populate][user]=true&populate[profile][populate][avatar]=true&populate=image&sort=createdAt:desc`
      );

      const postData = response.data.data || [];
      setPosts(postData);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

 useEffect(() => {
  const loadProfile = async () => {
    const saved = await AsyncStorage.getItem('profile');
    console.log(" RAW profile where AsyncStorage:", saved);

    if (saved) {
      const parsed = JSON.parse(saved);
      console.log(" Profile parsed:", parsed);
      setCurrentUserProfile(parsed);
    } else {
      console.log(" There is no profile saved");
    }
  };

  loadProfile();
}, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

 const openComments = (post) => {
  navigation.navigate("Comments", { 
    post,
    currentUserProfile  
  });
};

  const renderItem = ({ item }) => {
    const content = item.content || "";
    const profile = item.profile || {};
    const name = profile.name || "Usuario";
    const username = profile.user?.username || "@anon";
    const createdAt = item.createdAt;

    
    const avatar = profile.avatar?.url
      ? `${API_URL}${profile.avatar.url}`
      : null;

    
    const image = item.image || null;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openComments(item)}  
      >
        <TweetCard
          name={name}
          username={username}
          content={content}
          createdAt={createdAt}
          avatar={avatar}
          image={image}
          onCommentPress={() => openComments(item)} 
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={globalStyles.container}>
        
       
        <View style={HomeStyles.headerContainer}>
          <Image
            source={require("../assets/img/RotTweetLogo.png")}
            style={HomeStyles.logo}
            resizeMode="contain"
          />
          <Text style={HomeStyles.headerText}>Welcome</Text>
        </View>

       
        <FlatList
          data={posts}
          keyExtractor={(item) => item.documentId || item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => (
            <View style={TweetCardStyles.separator} />
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No posts yet
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
        <CustomButton
          icon="feather"
          onPress={() => navigation.navigate("CreatePost")}
          style={HomeStyles.floatingButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
