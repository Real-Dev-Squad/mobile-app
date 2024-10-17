import React from 'react';
import { Alert, Modal, Text, Pressable, View } from 'react-native';
import { styles } from './CustomModalStyle';
const message = 'Press Done button once you verify yourself from My-site';

const CustomModal = ({ modalVisible, setModalVisible, qrCodeLogin }) => {
  console.log('mess', message);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={qrCodeLogin}
          >
            <Text style={styles.textStyle}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;