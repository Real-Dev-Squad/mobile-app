import { Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Images from '../../constants/images/Image';
import Toast from 'react-native-toast-message';
import { CardStyles } from './Styles/CardStyles';

const Card = ({ item, posStyle, changecard, removeCard }: any) => {
  const translateY = useSharedValue(0);
  const [checked, setChecked] = useState(false);
  let deleteCard = 'false';

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      if (translateY.value < 150) {
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      translateY.value = withTiming(0, {
        duration: 700,
      });
      runOnJS(changecard)(item.id);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const markDone = () => {
    deleteCard = 'true';
    setChecked(true);
    Toast.show({
      type: 'error',
      text1: 'Mark as done',
      text2: 'Click here to mark undone',
      position: 'bottom',
      bottomOffset: 80,
      onPress: () => {
        Toast.hide();
        deleteCard = 'false';
        setChecked(false);
      },
    });
    setTimeout(() => {
      if (deleteCard === 'true') {
        changecard(item.id);
        removeCard(item.id);
      }
    }, 4000);
  };

  return (
    <View>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={[CardStyles.card, animatedStyle, { position: posStyle }]}
          >
            <View style={{ justifyContent: 'center' }}>
              <View>
                {item.isread && (
                  <Image
                    source={Images.earthIcon}
                    style={[CardStyles.icon, { alignSelf: 'flex-end' }]}
                  />
                )}
              </View>
              <View style={CardStyles.flex}>
                <TouchableOpacity onPress={markDone}>
                  {checked ? (
                    <Image
                      source={Images.checkedIcon}
                      style={[CardStyles.icon, { marginLeft: 5 }]}
                    />
                  ) : (
                    <Image
                      source={Images.uncheckedIcon}
                      style={[CardStyles.icon, { marginLeft: 5 }]}
                    />
                  )}
                </TouchableOpacity>
                <Text style={CardStyles.taskText}>{item.task}</Text>
              </View>
              <Image
                source={Images.externalLinkIcon}
                style={[CardStyles.icon, { alignSelf: 'flex-end' }]}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default Card;
