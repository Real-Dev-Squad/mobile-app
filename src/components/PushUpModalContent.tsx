import React from 'react';
import { Text, View } from 'react-native';
import { profileScreenStyles } from '../screens/ProfileScreen/styles';
import { calculateISODateFormat } from '../screens/AuthScreen/Util';
import { styles } from '../styles/PushUpModalContentStyle';

const PushUpModalContent = ({ task }) => {
  return (
    <View style={profileScreenStyles.modalContent}>
      <Text style={styles.dateText}>{calculateISODateFormat(task?.date)}</Text>
      <View style={styles.content}>
        <View style={styles.block}>
          <Text style={profileScreenStyles.smallTitle}>Completed: </Text>
          <Text style={styles.textTitle}>{task?.completed}</Text>
        </View>
        <View style={styles.block}>
          <Text style={profileScreenStyles.smallTitle}>Planned: </Text>
          <Text style={styles.textTitle}>{task?.planned}</Text>
        </View>
        <View style={styles.block}>
          <Text style={profileScreenStyles.smallTitle}>Blockers: </Text>
          <Text style={styles.textTitle}>{task?.blockers}</Text>
        </View>
        {/* <TouchableOpacity onPress={onClose}>
        <Text style={styles.buttonBg}>Close</Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default PushUpModalContent;
