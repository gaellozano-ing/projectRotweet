import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../Components/CustomButton';
import { colors } from '../Styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

const API_URL = 'http://192.168.1.8:1337'; // backend

const FollowingsScreen = () => {
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // get
  const fetchFollowings = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return;

      const res = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followings][populate][avatar]=*&populate[profile][populate][followings][populate][user]=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.profile?.followings || [];
      setFollowings(data);
    } catch (error) {
      console.log('Error cargando seguidos:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowings();
  }, []);

  // buttom
  const handleUnfollow = async (targetProfileDocumentId) => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return Alert.alert('Error','Token not found');

      // Get my full profile with followings
      const meRes = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followings]=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const myProfile = meRes.data.profile;
      const myProfileDocId = myProfile.documentId;
      const currentFollowings = myProfile.followings || [];

      // Filter the user I want to unfollow
      const updatedFollowings = currentFollowings.filter(
        (p) => p.documentId !== targetProfileDocumentId
      );

      // id
      const followingIds = updatedFollowings.map((p) => p.id);

      // put
      await axios.put(
        `${API_URL}/api/profiles/${myProfileDocId}`,
        {
          data: {
            followings: {
              set: followingIds.map((id) => ({ id })),
            },
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Successful','You unfollowed this user');
      fetchFollowings(); //refresh
    } catch (error) {
      console.log('Error unfollowing', error.response?.data || error.message);
      Alert.alert('Error','Error unfollowing');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <MaterialDesignIcons name="arrow-left" size={26} color={colors.primary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary }}>
          Following List
        </Text>
      </View>

      {/* list followings */}
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading Followed Users...</Text>
        ) : followings.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>You're not following anyone yet</Text>
        ) : (
          <FlatList
            data={followings}
            keyExtractor={(item) => item.documentId}
            renderItem={({ item }) => {
              const avatar = item.avatar?.url
                ? `${API_URL}${item.avatar.url}`
                : require('../assets/img/user.png');

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
                      source={typeof avatar === 'string' ? { uri: avatar } : avatar}
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

                  <CustomButton
                    title="Unfollow"
                    mode="outlined"
                    onPress={() => handleUnfollow(item.documentId)}
                    style={{
                      backgroundColor: '#f6072b8d',
                      borderColor: '#d32f2f',
                      borderWidth: 1,
                    }}
                    textColor="#ffF"
                    
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FollowingsScreen;
