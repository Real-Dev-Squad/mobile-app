import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Images from '../../constants/images/Image';
import Strings from '../../i18n/en';
import { styles } from './ConnectionScreenStyle';

type RetryFunction = () => void;

interface ConnectionScreenProps {
  retryConnect: RetryFunction;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({
  retryConnect,
}) => {
  return (
    <View style={styles.container}>
      <Image source={Images.noInternet} style={styles.offlineImage} />
      <Text style={styles.noInternetText}>{Strings.OFFLINE_TEXT}</Text>
      <TouchableOpacity onPress={retryConnect} style={styles.retryButton}>
        <Text style={styles.retry}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionScreen;