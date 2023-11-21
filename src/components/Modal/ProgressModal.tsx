import React, { useState } from 'react';
import { Button, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import CircularProgress from 'react-native-circular-progress-indicator';

function ProgressModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleModal}>
        <CircularProgress
          value={45}
          inActiveStrokeColor={'#58a07c'}
          inActiveStrokeOpacity={0.2}
          progressValueColor={'#fff'}
          strokeLinecap="round"
          activeStrokeColor="#6a6bcf"
          valueSuffix={'%'}
        />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} animationIn="bounceInDown">
        <View style={styles.Modal}>
          <View style={styles.card}>
            <Progress.Bar progress={0.3} width={200} borderRadius={5} />
            <Button style={styles.Button} title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 250,
    height: 300,
    justifyContent: 'center',
  },
  Button: {
    alignContent: 'flex-end',
    justifyContent: 'center',
    width: 20,
    marginTop: 10,
  },
});
export default ProgressModal;
