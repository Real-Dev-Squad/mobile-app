import { View } from 'react-native';
import React from 'react';
import NotifyButton from '../../components/Notify/NotifyButton';
import Colors from '../../constants/colors/Colors';
import { styles } from './NotifyScreenStyle';

const NotifyScreen = () => {
  const onNotifyHandler = () => {
    console.log('notify');
  };
  return (
    <View style={styles.container}>
      <NotifyButton
        onPress={onNotifyHandler}
        title={'Notify'}
        buttonStyle={{ backgroundColor: Colors.Primary_Color }}
        textStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default NotifyScreen;