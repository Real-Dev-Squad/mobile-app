import React, { useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
          value={30}
          radius={90}
          duration={1000}
          progressValueColor={'cyan'}
          titleFontSize={16}
          titleColor={'#eeb3b3'}
          titleStyle={{ fontWeight: 'bold' }}
          circleBackgroundColor={'#6181b1'}
          activeStrokeColor={'#2465FD'}
          activeStrokeSecondaryColor={'#C3305D'}
          inActiveStrokeColor={'white'}
          progressFormatter={(value: number) => {
            'worklet';

            return value.toFixed(2);
          }}
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
    height: 150,
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
