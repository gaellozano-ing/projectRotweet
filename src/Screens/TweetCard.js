import React from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
            <Text style={tweetCardStyles.name}>{username || "Anónimo"}</Text>
            <Text style={tweetCardStyles.username}> · {formattedDate}</Text>
          </View>

          <Text style={tweetCardStyles.tweetText}>{content || "Sin contenido"}</Text>

        
          <View style={tweetCardStyles.iconRow}>
            <Icon name="chat-outline" size={20} color="#657786" />
            <Icon name="repeat" size={20} color="#657786" />
            <Icon name="heart-outline" size={20} color="#657786" />
            <Icon name="share-variant" size={20} color="#657786" />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default TweetCard;
