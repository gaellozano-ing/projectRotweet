import React, { useState, useCallback } from 'react';
import { View, ImageBackground, ActivityIndicator, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import styles from '../Styles/ProfileStyles';
import CustomButton from '../Components/CustomButton';
import { colors } from '../Styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import TweetCard from './TweetCard';

const API_URL = 'http://192.168.1.8:1337'; // backend 

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // get profile  and posts
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      // get profile
      const userRes = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][avatar]=*&populate[profile][populate][followers]=*&populate[profile][populate][followings]=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = userRes.data;
      const profileData = user.profile;

      if (!profileData) {
        setProfile(null);
        return;
      }

      setProfile({
        documentId: profileData.documentId,
        name: profileData.name,
        username: user.username,
        bio: profileData.bio || '',
        joinDate: new Date(user.createdAt).toLocaleDateString(),
        avatar:
          profileData.avatar?.formats?.thumbnail?.url ||
          profileData.avatar?.url ||
          null,
        followersCount: profileData.followers?.length || 0,
        followingsCount: profileData.followings?.length || 0,
      });

      // get post
      const postsRes = await axios.get(
        `${API_URL}/api/posts?filters[profile][documentId][$eq]=${profileData.documentId}&populate[profile][populate][user]=true&populate[profile][populate][avatar]=true&sort=createdAt:desc`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts(postsRes.data.data || []);
    } catch (error) {
      console.log('Error retrieving profile or posts:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchProfile();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfile().then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No profile information was found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img/fondoPerfil.jpeg')}
        style={styles.headerBackground}
      >
        <View style={styles.headerButtons}>
          <MaterialDesignIcons
            name="arrow-left"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.headerRightButtons}>
            <MaterialDesignIcons name="magnify" size={24} color="white" style={styles.headerIcon} />
            <MaterialDesignIcons name="dots-vertical" size={24} color="white" />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={80}
            source={
              profile.avatar
                ? { uri: `${API_URL}${profile.avatar}` }
                : require('../assets/img/user.png')
            }
            style={styles.avatar}
          />
          <CustomButton
            mode="contained"
            style={styles.editButton}
            title="Edit profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>

        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
        <Text style={styles.joinDate}>
          <MaterialDesignIcons name="calendar-month" size={16} color={colors.darkGray} /> joined in{' '}
          {profile.joinDate}
        </Text>

        {/* 🔹 Contadores de seguidores / seguidos */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FollowersList')}
            style={{ marginRight: 20 }}
          >
            <Text style={{ color: colors.darkGray }}>
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                {profile.followersCount}
              </Text>{' '}
              Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('FollowingList')}>
            <Text style={{ color: colors.darkGray }}>
              <Text style={{ fontWeight: 'bold', color: colors.text }}>
                {profile.followingsCount}
              </Text>{' '}
              Following
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* list post from user */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.documentId || item.id.toString()}
        renderItem={({ item }) => {
          const post = item;
          const profile = post.profile || {};
          const name = profile.name || 'Usuario';
          const username = profile.user?.username || '@anon';
          const avatar = profile.avatar?.url ? `${API_URL}${profile.avatar.url}` : null;

          return (
            <TweetCard
              name={name}
              username={username}
              content={post.content}
              createdAt={post.createdAt}
              avatar={avatar}
            />
          );
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            This user has no posts yet.
          </Text>
        }
      />
    </View>
  );
};

export default ProfileScreen;
