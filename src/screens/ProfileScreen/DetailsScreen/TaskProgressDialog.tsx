import React from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { profileScreenStyles } from '../styles';
import { getDate } from '../../AuthScreen/Util';

const TaskProgressDialog = ({ task, onClose }) => {

  return (
    <View>
      <Modal transparent={true}>
        <View style={[styles.centerMain]}>
          <View style={[styles.modalView]}>
            <Text style={styles.dateText}>{getDate(task?.date)}</Text>
            <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
              Completed:{' '}
            </Text>
            <Text style={styles.textTitle}>{task?.completed}</Text>
            <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
              Planned:{' '}
            </Text>
            <Text style={styles.textTitle}>{task?.planned}</Text>
            <Text style={[profileScreenStyles.smallTitle, styles.textTitle]}>
              Blockers:{' '}
            </Text>
            <Text style={styles.textTitle}>{task?.blockers}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.buttonBg}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 2,
    textAlign: 'left',
    color: '#000000',
  },
  dateText: {
    fontSize: 24,
    padding: 5,
    color: 'black',
    textAlign: 'center',
  },
});

export default TaskProgressDialog;
