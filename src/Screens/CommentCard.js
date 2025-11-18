import React from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import commentCardStyles from "../Styles/CommentCardStyles"

const API_URL = "http://192.168.1.6:1337";

const CommentCard = ({ name, username, avatar, content, createdAt }) => {
  // Fecha formateada igual que TweetCard
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      })
    : "";

  // Avatar mismo sistema que TweetCard
  const avatarSource = avatar
    ? typeof avatar === "string"
      ? { uri: avatar }
      : avatar
    : require("../assets/img/user.png");

  return (
    <Card style={commentCardStyles.card}>
      <Card.Content style={commentCardStyles.contentRow}>
        
        {/* Avatar */}
        <Image
          source={avatarSource}
          style={commentCardStyles.avatar}
        />

        <View style={commentCardStyles.textContainer}>
          
          {/* Header: nombre + username + fecha */}
          <View style={commentCardStyles.headerRow}>
            <Text style={commentCardStyles.name}>{name}</Text>
            <Text style={commentCardStyles.username}>
              {" "}
              {username} · {formattedDate}
            </Text>
          </View>

          {/* Texto del comentario */}
          <Text style={commentCardStyles.commentText}>
            {content || "Comentario vacío"}
          </Text>

        </View>
      </Card.Content>
    </Card>
  );
};

export default CommentCard;
