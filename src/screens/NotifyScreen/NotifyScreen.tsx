import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NotifyForm from '../../components/Notify/NotifyForm';
import Colors from '../../constants/colors/Colors';

const NotifyScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Notifications</Text>
      <NotifyForm />
    </View>
  );
};

export default NotifyScreen;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.Primary_Color,
    paddingBottom: 10,
  },
});
