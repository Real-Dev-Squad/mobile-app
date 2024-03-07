import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';

const Profile = ({
  selectedUser,
  profileHeight,
  profileWidth,
  marginTop,
  mHeight,
}: {
  selectedUser: UserInfoType;
  profileHeight?: number;
  profileWidth?: number;
  marginTop?: number;
  mHeight?: number;
  mWidth?: number;

  // item: { first_name: string; last_name: string };
}) => {
  const { picture, first_name, last_name } = selectedUser;
  return (
    <View style={styles.container}>
      {picture?.url ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: picture.url }}
            style={[
              styles.profileImage,
              {
                height: profileHeight || 50,
                width: profileWidth || 50,
                // marginTop: marginTop,
                // maxHeight: mHeight,
              },
            ]}
            accessibilityLabel="User Profile Image"
          />
        </View>
      ) : (
        <View
          style={[
            styles.defaultImageContainer,
            {
              height: profileHeight || 50,
              width: profileWidth || 50,
              maxHeight: mHeight,
            },
          ]}
        >
          <Text style={styles.defaultImageText}>
            {first_name?.charAt(0)}
            {last_name?.charAt(0)}
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
