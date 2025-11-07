import React from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import tweetCardStyles from "../Styles/TweetCardStyles";

const TweetCard = ({ username, content, createdAt, avatar }) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    : "";

  return (
    <Card style={tweetCardStyles.card}>
      <Card.Content style={tweetCardStyles.contentRow}>
      
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
          />
        ) : (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#ccc",
            }}
          />
        )}

     
        <View style={tweetCardStyles.textContainer}>
          <View style={tweetCardStyles.headerRow}>
            <Text style={tweetCardStyles.name}>{username || "Anonymous"}</Text>
            <Text style={tweetCardStyles.username}> · {formattedDate}</Text>
          </View>

          <Text style={tweetCardStyles.tweetText}>{content || "No content"}</Text>

        
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
