import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Button,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Noteworthy2 from './NoteWorthy';
import AllContributions from './All';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const ActiveScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Active task</Text>
    </View>
  );
};

const CustomTab = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? '#DBEAFE' : '#E2E8F0',
        borderRadius: 20, // Adjust this value to control the capsule shape
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 3,
      }}
      onPress={onPress}
    >
      <Text style={{ color: isActive ? '#1D4ED8' : '#475569', fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ContributionDetails = () => {
  return (
    // <GestureHandlerRootView>
    <Tab.Navigator
      initialRouteName="All contributions"
      screenOptions={{
        tabBarShowIcon: false, // Hide default icons
        tabBarShowLabel: false, // Hide default labels
      }}
      tabBar={(props) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            // backgroundColor: 'blue',
          }}
        >
          <CustomTab
            title="All contributions"
            onPress={() => props.navigation.navigate('All')}
            isActive={props.state.index === 0}
          />
          <CustomTab
            title="Active"
            onPress={() => props.navigation.navigate('Active')}
            isActive={props.state.index === 1}
          />
          <CustomTab
            title="Noteworthy"
            onPress={() => props.navigation.navigate('Noteworthy')}
            isActive={props.state.index === 2}
          />
        </View>
      )}
    >
      <Tab.Screen name="All" component={AllContributions} />
      <Tab.Screen name="Active" component={ActiveScreen} />
      <Tab.Screen name="Noteworthy" component={Noteworthy2} />
    </Tab.Navigator>
    // </GestureHandlerRootView>
  );
};

export default ContributionDetails;
