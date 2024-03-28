import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale } from '../../utils/utils';
import StyleConfig from '../../utils/StyleConfig';
import { strings } from '../../constants/strings/strings';
import { images } from '../../constants/assets/images';

type RetryFunction = () => void;

interface ConnectionScreenProps {
  retryConnect: RetryFunction;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({
  retryConnect,
}) => {
  return (
    <View style={styles.container}>
      <Image source={images.NO_INTERNET} style={styles.offlineImage} />
      <Text style={styles.noInternetText}>{strings.OFFLINE_TEXT}</Text>
      <TouchableOpacity onPress={retryConnect} style={styles.retryButton}>
        <Text style={styles.retry}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleConfig.colors.white,
  },

  retryButton: {
    backgroundColor: StyleConfig.colors.primary,
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: 8,
  },
  retry: {
    color: StyleConfig.colors.white,
  },

  noInternetText: {
    color: StyleConfig.colors.darkGrey,
    fontWeight: '500',
    fontSize: scale(16),
    margin: scale(10),
  },

  offlineImage: {
    height: scale(150),
    width: scale(150),
  },
});
