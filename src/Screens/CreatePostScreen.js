import React, {useState,useEffect} from "react";
import { View,TextInput, Alert } from "react-native";
import { Text,Button } from "react-native-paper";
import axios from "axios";
import globalStyles, { colors } from "../Styles/GlobalStyles";
import CreatePostStyles from "../Styles/CreatePostStyles";

const CreatePostScreen  = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePost  = async () => {
        if (content.trim() === '') {
            Alert.alert('Error', 'Post content cannot be empty.');
            return;
        }
            setLoading(true);
        try {
           const response = await axios.post('http://192.168.1.6:1337/api/posts',{
            content: content,
              });
            console.log('✅ Post created:', response.data);
            Alert.alert('Success', 'Your post has been created successfully!');
            setContent(''); 
           } catch (error) {
            console.error('❌ Error creating post:', error);
            Alert.alert('Error', 'There was an issue creating your post. Please try again.');
           } finally {
            setLoading(false);
           }
           
            };
    return (
        <View style={[globalStyles.container, CreatePostStyles.container]}>
            <Text style={[globalStyles.titleText, CreatePostStyles.title]}>Create Post</Text>

            <TextInput
                placeholder="What's happening?"
                value={content}
                onChangeText={setContent}
                multiline
                style={CreatePostStyles.input}
            />
            <TouchableOpacity
                style={CreatePostStyles.button}
                onPress={handlePost}
                disabled={loading}
      >
                <Text style={CreatePostStyles.buttonText}>
                    {loading ? 'Posting...' : 'Post'}
                </Text>
            </TouchableOpacity>
    </View>

    )

        
}//createPost Key
export default CreatePostScreen;