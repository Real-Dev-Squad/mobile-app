import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';

const Profile = ({
  selectedUser,
  profileHeight,
  profileWidth,
}: {
  selectedUser: UserInfoType;
  profileHeight?: number;
  profileWidth?: number;

  // item: { first_name: string; last_name: string };
}) => {
  const { picture, first_name, last_name } = selectedUser;
  return (
    <View style={styles.container}>
      {picture?.url ? (
        <Image
          source={{ uri: picture.url }}
          style={[
            styles.profileImage,
            { height: profileHeight || 50, width: profileWidth || 50 },
          ]}
          accessibilityLabel="User Profile Image"
        />
      ) : (
        <View
          style={[
            styles.defaultImageContainer,
            { height: profileHeight || 50, width: profileWidth || 50 },
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
    // marginLeft: -10,
    // marginRight: 2,
  },
  profileImage: {
    borderRadius: 25, // Use half of width/height for a circular shape
  },
  defaultImageContainer: {
    width: 50,
    height: 50,
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
