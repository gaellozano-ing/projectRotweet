import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import HomeScreen from '../Screens/HomeScreen';
import SettingScreen from '../Screens/SettingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { colors } from '../Styles/GlobalStyles';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: { backgroundColor: colors.primary, height: 60, paddingBottom: 10 },
        
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="home-variant" color={color} size={28} />
          ),
         
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="account" color={color} size={28} />
          ),
          title: 'Perfil'
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialDesignIcons name="cog-outline" color={color} size={28} />
          ),
          title: 'Ajustes'
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
