import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import TabNavigator from '../Navigation/TabNavigator'
import CreatePost from '../Screens/CreatePostScreen';
import EditProfileScreen from '../Screens/EditProfileScreen'
import FollowersScreen from '../Screens/FollowersScreen'
import FollowingsScreen from '../Screens/FollowingsScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="FollowersList" component={FollowersScreen} />
      <Stack.Screen name="FollowingList" component={FollowingsScreen} />
    </Stack.Navigator>
  );
}
