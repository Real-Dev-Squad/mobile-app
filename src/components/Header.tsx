import React from 'react';
import { View, Image, SafeAreaView, StatusBar } from 'react-native';
import Images from '../constants/images/Image';
import { styles } from '../styles/HeaderStyle';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Image source={Images.rdsLogo} style={styles.logo} />
        <StatusBar barStyle={'light-content'} />
      </View>
    </SafeAreaView>
  );
};

export default Header;