import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';

const Profile = ({
  selectedUser = {},
  profileHeight,
  profileWidth,
  mHeight,
  multimodeOn = false,
  index,
}: {
  selectedUser: UserInfoType | {};
  profileHeight?: number;
  profileWidth?: number;
  mHeight?: number;
  mWidth?: number;
  multimodeOn: boolean;
  // item: { first_name: string; last_name: string };
}) => {
  console.log('🚀 ~ selectedUser:>>>>>>>>>>>', selectedUser);
  return (
    <View style={styles.container}>
      {selectedUser?.picture?.url ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedUser?.picture?.url }}
            style={[
              styles.profileImage,
              multimodeOn && index === 0
                ? { borderWidth: 2, borderColor: 'green' }
                : null,

              {
                height: profileHeight || 50,
                width: profileWidth || 50,
                backgroundColor: 'yellow',
              },
            ]}
            accessibilityLabel="User Profile Image"
          />
        </View>
      ) : (
        <View
          style={[
            styles.defaultImageContainer,
            multimodeOn && index === 0
              ? { borderWidth: 2, borderColor: 'green' }
              : null,
            {
              height: profileHeight || 50,
              width: profileWidth || 50,
              maxHeight: mHeight,
            },
          ]}
        >
          <Text style={styles.defaultImageText}>
            {selectedUser?.first_name?.charAt(0)}
            {selectedUser?.last_name?.charAt(0)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  profileImage: {
    borderRadius: 25, // Use half of width/height for a circular shape
  },
  imageContainer: {
    // backgroundColor: 'yellow',
    // width: 50,
    // height: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  defaultImageContainer: {
    // width: 50,
    // height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray', // Add background color for a placeholder
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: 'white', // Set text color for better visibility
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
