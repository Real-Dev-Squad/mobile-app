import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { profileScreenStyles } from '../screens/ProfileScreen/styles';
import { calculateISODateFormat } from '../screens/AuthScreen/Util';

const PushUpModalContent = ({ task }) => {
  return (
    <View style={profileScreenStyles.modalContent}>
      <Text style={styles.dateText}>{calculateISODateFormat(task?.date)}</Text>
      <View style={styles.content}>
        <View style={styles.block}>
          <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
            Completed:{' '}
          </Text>
          <Text style={styles.textTitle}>{task?.completed}</Text>
        </View>
        <View style={styles.block}>
          <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
            Planned:{' '}
          </Text>
          <Text style={styles.textTitle}>{task?.planned}</Text>
        </View>
        <View style={styles.block}>
          <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
            Blockers:{' '}
          </Text>
          <Text style={styles.textTitle}>{task?.blockers}</Text>
        </View>
        {/* <TouchableOpacity onPress={onClose}>
        <Text style={styles.buttonBg}>Close</Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerMain: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  content: {
    margin: 4,
    alignSelf: 'center',
  },
  modalView: {
    justifyContent: 'center',
    marginHorizontal: 30,
    backgroundColor: '#f2f0f0',
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#F0F0F0',
    borderRadius: 8,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  buttonBg: {
    width: '100%',
    backgroundColor: '#0034a5',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textTitle: {
    textAlign: 'center',
    color: '#000000',
  },
  dateText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PushUpModalContent;
