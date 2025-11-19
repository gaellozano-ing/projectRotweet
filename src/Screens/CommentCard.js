import React from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import commentCardStyles from "../Styles/CommentCardStyles"

const API_URL = "http://192.168.1.6:1337";

const CommentCard = ({ name, username, avatar, content, createdAt }) => {
 
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    : "";


  const avatarSource = avatar
    ? typeof avatar === "string"
      ? { uri: avatar }
      : avatar
    : require("../assets/img/user.png");

  return (
    <Card style={commentCardStyles.card}>
      <Card.Content style={commentCardStyles.contentRow}>
        
      
        <Image
          source={avatarSource}
          style={commentCardStyles.avatar}
        />

        <View style={commentCardStyles.textContainer}>
          
       
          <View style={commentCardStyles.headerRow}>
            <Text style={commentCardStyles.name}>{name}</Text>
            <Text style={commentCardStyles.username}>
              {" "}
              {username} · {formattedDate}
            </Text>
          </View>

        
          <Text style={commentCardStyles.commentText}>
            {content || "Empty comment"}
          </Text>

        </View>
      </Card.Content>
    </Card>
  );
};

export default CommentCard;
