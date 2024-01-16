import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity, Modal, Image } from 'react-native';
import Images from '../constants/images/Image';
import { useDispatch, useSelector } from 'react-redux';

const EllipseComponent = ({
  handleLogout,
  isDropdownVisible,
  handleDropDown,
}: {
  handleLogout: () => void;
  isDropdownVisible: boolean;
  handleDropDown: () => void;
}) => {
  const dispatch = useDispatch();
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionsButton} onPress={handleDropDown}>
        <Text style={styles.verticalEllipse}>...</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={handleDropDown}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              onPress={handleDropDown}
              style={styles.closeContainer}
            >
              <Image
                // height={10}
                // width={10}
                style={styles.close}
                source={Images.closeIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.dropdownOption}>Logout</Text>
              {/* Add more dropdown options as needed */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                isProdEnvironment
                  ? dispatch({ type: 'DEV' })
                  : dispatch({ type: 'PROD' });
                handleDropDown();
              }}
            >
              <Text style={[styles.dropdownOption, { color: 'black' }]}>
                {!isProdEnvironment ? 'Prod mode' : 'Dev mode'}
              </Text>
              {/* Add more dropdown options as needed */}
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsButton: {
    flex: 1,
    padding: 4,
    alignItems: 'flex-end',
  },
  verticalEllipse: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
    padding: 8,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 10, // Adjust the top position according to your layout
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
  },
  dropdownOption: {
    fontSize: 18,
    paddingVertical: 8,
    color: 'red',
  },
  closeContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  closeButton: {
    fontSize: 18,
    color: 'black',
    padding: 2,
  },
  close: {
    height: 20,
    width: 20,
  },
});

export default EllipseComponent;
