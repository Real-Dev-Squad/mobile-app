import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';

const EllipseComponent = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionsButton} onPress={handleDropdown}>
        <Text style={styles.verticalEllipse}>...</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              onPress={() => setDropdownVisible(false)}
              style={styles.closeContainer}
            >
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.dropdownOption}>Logout</Text>
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
  },
  dropdownContainer: {
    position: 'absolute',
    top: 40, // Adjust the top position according to your layout
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
    padding: 8,
  },
  closeButton: {
    fontSize: 18,
    color: 'black',
  },
});

export default EllipseComponent;
