import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../Styles/GlobalStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://192.168.1.8:1337'; // backend

const FollowersScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [myFollowings, setMyFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Get followers
  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return;

      const res = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followers][populate][avatar]=*&populate[profile][populate][followers][populate][user]=*&populate[profile][populate][followings]=*`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const profile = res.data.profile;
      const followersList = profile.followers || [];
      const followingList = profile.followings?.map(f => f.documentId) || [];

      setFollowers(followersList);
      setMyFollowings(followingList);
    } catch (error) {
      console.log(
        'Error obtaining followers:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // refresh
  useFocusEffect(
    useCallback(() => {
      fetchFollowers();
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFollowers().then(() => setRefreshing(false));
  }, []);

  // Follow user
  const handleFollow = async targetProfileDocId => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return alert('Token not found');

      // Obtener mi perfil
      const meRes = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followings]=*`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const myProfileDocId = meRes.data.profile.documentId;
      const currentFollowings =
        meRes.data.profile.followings?.map(p => p.documentId) || [];

      // If he keeps going, he's not doing anything.
      if (currentFollowings.includes(targetProfileDocId)) {
        return Alert.alert('Warning','You already follow this user');
      }

      // put
      await axios.put(
        `${API_URL}/api/profiles/${myProfileDocId}`,
        {
          data: {
            followings: {
              connect: [{ documentId: targetProfileDocId }],
            },
          },
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setMyFollowings(prev => [...prev, targetProfileDocId]);
      Alert.alert('Sucesfull', 'You are now following this user');
    } catch (error) {
      console.log('Error following:', error.response?.data || error.message);
      Alert.alert('Error', 'Error when trying to follow');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading followers...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 10 }}
        >
          <MaterialDesignIcons
            name="arrow-left"
            size={26}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary }}
        >
          Followers List
        </Text>
      </View>

      {followers.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>You have no followers yet</Text>
        </View>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={item => item.documentId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const avatar = item?.avatar?.url
              ? `${API_URL}${item.avatar.url}`
              : require('../assets/img/user.png');
            const isFollowing = myFollowings.includes(item.documentId);

            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                  backgroundColor: colors.lightGray,
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={
                      typeof avatar === 'string' ? { uri: avatar } : avatar
                    }
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ color: colors.darkGray }}>
                      {item.user?.username}
                    </Text>
                  </View>
                </View>

                {!isFollowing && (
                  <CustomButton
                    title="Follow"
                    mode="contained"
                    icon="plus"
                    onPress={() => handleFollow(item.documentId)}
                    style={{ backgroundColor: colors.primary }}
                    textColor="#fff"
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default FollowersScreen;
