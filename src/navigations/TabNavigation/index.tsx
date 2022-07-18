import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, Text } from 'react-native';
import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts/tab-font';
import Images from '../../constants/images';
import Strings from '../../i18n/en';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import TaskScreen from '../../screens/TaskScreen';
import { TabViewStyle } from './style';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        initialRouteName={Strings.Tab_Home}
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: TabViewStyle.tab_bar,
        })}
      >
        <Tab.Screen
          name={Strings.Tab_Home}
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    fontSize: Fonts.Tab_Text_Font,
                    color: focused
                      ? Colors.Tab_Active_Color
                      : Colors.Tab_Inactive_Color,
                  }}
                >
                  {Strings.Tab_Home}
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={TabViewStyle.tab_icon}
                  source={focused ? Images.homeIcon : Images.homeIconUnF}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={Strings.Tab_Task}
          component={TaskScreen}
          options={{
            headerShown: false,

            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    fontSize: Fonts.Tab_Text_Font,
                    color: focused
                      ? Colors.Tab_Active_Color
                      : Colors.Tab_Inactive_Color,
                  }}
                >
                  {Strings.Tab_Task}
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={TabViewStyle.tab_icon}
                  source={focused ? Images.taskIcon : Images.taskIconUnF}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name={Strings.Tab_Profile}
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    fontSize: Fonts.Tab_Text_Font,
                    color: focused
                      ? Colors.Tab_Active_Color
                      : Colors.Tab_Inactive_Color,
                  }}
                >
                  {Strings.Tab_Profile}
                </Text>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  style={TabViewStyle.tab_icon}
                  source={focused ? Images.profileIcon : Images.profileIconUnF}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
