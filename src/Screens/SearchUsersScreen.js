import React, { useState } from 'react';
import { View, FlatList, Image,Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../Styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://192.168.1.6:1337'; // bakend

const SearchUsersScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myFollowings, setMyFollowings] = useState([]); 

  // Search users
  const searchUsers = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return;

      // Find users and populate their profile and avatar
      const res = await axios.get(
        `${API_URL}/api/users?filters[username][$containsi]=${query}&populate[profile][populate][avatar]=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setResults(res.data);

      // Get current followings
      const meRes = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followings]=*`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const followings =
        meRes.data.profile?.followings?.map(f => f.documentId) || [];
      setMyFollowings(followings);
    } catch (error) {
      console.log(
        'Error searching for users:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Follow / unfollow
  const handleFollow = async targetProfileDocId => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return Alert.alert('The token was not found.');

      // Get my profile with following towns
      const meRes = await axios.get(
        `${API_URL}/api/users/me?populate[profile][populate][followings]=*`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const myProfile = meRes.data.profile;
      const myProfileDocId = myProfile.documentId;
      const currentFollowings =
        myProfile.followings?.map(p => p.documentId) || [];

      let updatedData;


      if (currentFollowings.includes(targetProfileDocId)) {
        updatedData = {
          followings: {
            disconnect: [{ documentId: targetProfileDocId }],
          },
        };
        setMyFollowings(prev => prev.filter(id => id !== targetProfileDocId));
        Alert.alert('Successful','You unfollowed this user',);
      } else {
        // If I don't follow it  follow
        updatedData = {
          followings: {
            connect: [{ documentId: targetProfileDocId }],
          },
        };
        setMyFollowings(prev => [...prev, targetProfileDocId]);
        Alert.alert('Successful','You are now following this user');
      }

      // update
      await axios.put(
        `${API_URL}/api/profiles/${myProfileDocId}`,
        { data: updatedData },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.log(
        'Error al seguir/dejar de seguir usuario:',
        error.response?.data || error.message,
      );
      Alert.alert('Error','Error trying to follow/unfollow user');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
            textAlign: 'center',
            padding: '30',
          }}
        >
          Search Users
        </Text>
        <TextInput
          label="@user"
          value={query}
          onChangeText={setQuery}
          mode="outlined"
          style={{ marginBottom: 10 }}
          right={<TextInput.Icon icon="magnify" onPress={searchUsers} />}
        />

        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Searching...
          </Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const profile = item.profile;
              if (!profile) return null;

              const avatar = profile?.avatar?.url
                ? `${API_URL}${profile.avatar.url}`
                : require('../assets/img/user.png');

              const isFollowing = myFollowings.includes(profile.documentId);

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                    backgroundColor: '#f9f9f9',
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
                      <Text style={{ fontWeight: 'bold' }}>
                        {profile?.name || item.username}
                      </Text>
                      <Text style={{ color: colors.darkGray }}>
                        {item.username}
                      </Text>
                    </View>
                  </View>

                  <CustomButton
                    title={isFollowing ? 'unFollow' : 'Follow'}
                    mode={isFollowing ? 'outlined' : 'contained'}
                    onPress={() => handleFollow(profile.documentId)}
                    style={{
                      backgroundColor: isFollowing ? '#f42222a0' : colors.primary,
                      
                    }}
                    textColor={isFollowing ? colors.primary : '#fff'}
                    icon= {isFollowing ? 'minus' : 'plus'}
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

export default SearchUsersScreen;
