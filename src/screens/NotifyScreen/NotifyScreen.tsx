import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotifyButton from '../../components/Notify/NotifyButton';
import Colors from '../../constants/colors/Colors';
import LocalNotification from '../../actions/LocalNotification';
import RemoteNotification from '../../actions/RemoteNotification';

const NotifyScreen = () => {
  // const onNotifyHandler = () => {
  //   console.log('notify');
  // };
  return (
    <View style={styles.container}>
      <RemoteNotification />

      <NotifyButton
        onPress={LocalNotification}
        title={'Notify'}
        buttonStyle={{ backgroundColor: Colors.Primary_Color }}
        textStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default NotifyScreen;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
