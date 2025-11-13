import React from 'react';
import { View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import tweetCardStyles from '../Styles/TweetCardStyles';

const TweetCard = ({ name, username, content, createdAt, avatar }) => {
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

  return (
    <Card style={tweetCardStyles.card}>
      <Card.Content style={tweetCardStyles.contentRow}>
        <Image
          source={avatarSource}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />

        <View style={tweetCardStyles.textContainer}>
          <View style={tweetCardStyles.headerRow}>
            <Text style={tweetCardStyles.name}>{name}</Text>
            <Text style={tweetCardStyles.username}>
              {' '}
              {username} · {formattedDate}
            </Text>
          </View>

          <Text style={tweetCardStyles.tweetText}>
            {content || 'No content'}
          </Text>

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
