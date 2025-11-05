import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomButton from '../Components/CustomButton';
import { colors } from '../Styles/GlobalStyles';
import styles from '../Styles/EditProfileStyles';

const API_URL = 'http://192.168.1.8:1337'; 
export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          }
        }
      } catch (error) {
        console.log(
          ' Error cargando perfil:',
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

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

      // Obtener usuario autenticado con populate completo
      const userRes = await axios.get(
        `${API_URL}/api/users/me?populate=profile.avatar`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = userRes.data;

      let uploadedImageId = null;

      // Si se seleccionó una nueva imagen, subirla a Strapi
      if (avatar && avatar.startsWith('file://')) {
        const formData = new FormData();
        formData.append('files', {
          uri: avatar,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });

        const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        uploadedImageId = uploadRes.data[0].id;
      }

      //  Actualizar el perfil (con el id del avatar si se subió)
      await axios.put(
        `${API_URL}/api/profiles/${user.profile.id}`,
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

      Alert.alert(
        '✅ Perfil actualizado',
        'Los cambios se guardaron correctamente.',
      );
      navigation.goBack();
    } catch (error) {
      console.log(
        'Error actualizando perfil:',
        error.response?.data || error.message,
      );
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
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
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image
          source={
            avatar ? { uri: avatar } : require('../assets/img/descarga.jpeg')
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <CustomButton title="Cambiar foto" onPress={pickImage} />
      </View>

      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="account-outline" />}
      />

      <TextInput
        label="Biografía"
        value={bio}
        onChangeText={setBio}
        mode="outlined"
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <CustomButton
        title="Guardar cambios"
        icon="content-save"
        mode="contained"
        onPress={handleSave}
      />
    </View>
  );
}
