import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { UserInfoType } from '../../context/type';

const Profile = ({
  selectedUser,
  profileHeight,
  profileWidth,
  mHeight,
  multimodeOn = false,
  index,
}: {
  selectedUser: UserInfoType;
  profileHeight?: number;
  profileWidth?: number;
  marginTop?: number;
  mHeight?: number;
  mWidth?: number;
  multimodeOn: boolean;
  index: number;

  // item: { first_name: string; last_name: string };
}) => {
  const { picture, first_name, last_name } = selectedUser;
  return (
    <View style={styles.container}>
      {picture?.url ? (
        <View style={[styles.imageContainer]}>
          <Image
            source={{ uri: picture.url }}
            style={[
              styles.profileImage,
              multimodeOn && index === 0
                ? { borderWidth: 2, borderColor: 'green' }
                : null,

              {
                height: profileHeight || 50,
                width: profileWidth || 50,
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
  },
  profileImage: {
    borderRadius: 25,
  },
  imageContainer: {
    borderRadius: 25,
    alignItems: 'center',
  },
  defaultImageContainer: {
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultImageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;
