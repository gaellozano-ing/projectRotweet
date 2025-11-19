import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import tweetCardStyles from '../Styles/TweetCardStyles';

const API_URL = "http://192.168.1.6:1337";

const TweetCard = ({ name, username, content, createdAt, avatar, image }) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      })
    : '';

  const avatarSource = avatar
    ? typeof avatar === 'string'
      ? { uri: avatar }
      : avatar
    : require('../assets/img/user.png');

  const postImageSource =
    image && image.url
      ? { uri: `${API_URL}${image.url}` }
      : null;

  return (
    <Card style={tweetCardStyles.card}>
      <Card.Content style={tweetCardStyles.contentRow}>
        
        {/* Avatar */}
        <Image
          source={avatarSource}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />

        <View style={tweetCardStyles.textContainer}>
          
          {/* Header */}
          <View style={tweetCardStyles.headerRow}>
            <Text style={tweetCardStyles.name}>{name}</Text>
            <Text style={tweetCardStyles.username}>
              {' '}
              {username} · {formattedDate}
            </Text>
          </View>

          {/* Text */}
          <Text style={tweetCardStyles.tweetText}>
            {content || 'No content'}
          </Text>

          {/* 🔥 Imagen del POST */}
          {postImageSource && (
            <Image
              source={postImageSource}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 12,
                marginTop: 10,
              }}
            />
          )}

          {/* Icons */}
          <View style={tweetCardStyles.iconRow}>
            <MaterialDesignIcons name="chat-outline" size={20} color="#657786" />
            <MaterialDesignIcons name="heart-outline" size={20} color="#657786" />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default TweetCard;
