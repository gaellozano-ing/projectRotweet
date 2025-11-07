import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../Components/CustomButton';
import styles from '../Styles/EditProfileStyles';

const API_URL = 'http://192.168.1.8:1337';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  // carga
  const loadProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const userRes = await axios.get(
        `${API_URL}/api/users/me?populate=profile.avatar`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const user = userRes.data;
      const profile = user.profile;

      if (profile) {
        setName(profile.name || '');
        setBio(profile.bio || '');
        if (profile.avatar?.url) {
          setAvatar(`${API_URL}${profile.avatar.url}`);
        } else {
          setAvatar(null);
        }
      }
    } catch (error) {
      console.log(
        'Error loading profile:',
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) return;

      //  user
      const userRes = await axios.get(
        `${API_URL}/api/users/me?populate=profile.avatar`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const user = userRes.data;
      const profileId = user?.profile?.documentId; // documentid
      if (!profileId) {
        Alert.alert('Error', 'The user profile was not found.');
        return;
      }

      let uploadedImageId = null;

      // image
      if (
        avatar &&
        (avatar.startsWith('file://') || avatar.startsWith('content://'))
      ) {
        const formData = new FormData();
        formData.append('files', {
          uri: avatar,
          name: 'avatar.jpg',
          type: 'image/jpeg',
        });

        const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        uploadedImageId = uploadRes.data[0].id;
      }

      // update
      await axios.put(
        `${API_URL}/api/profiles/${profileId}`,
        {
          data: {
            name,
            bio,
            ...(uploadedImageId && { avatar: uploadedImageId }),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // refresh
      await loadProfile();

      Alert.alert(
        'Updated profile',
        'The changes were saved successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.log(
        'Error updating profile:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'The profile could not be updated.');
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text>Charging...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={avatar ? { uri: avatar } : require('../assets/img/user.png')}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <CustomButton title="Change photo" onPress={pickImage} />
      </View>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="account-outline" />}
      />

      <TextInput
        label="Bio"
        value={bio}
        onChangeText={setBio}
        mode="outlined"
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <CustomButton
        title="Save"
        icon="content-save"
        mode="contained"
        onPress={handleSave}
      />
    </View>
  );
}
