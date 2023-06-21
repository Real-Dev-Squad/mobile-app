import { Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Animated, {
  Easing,
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

type items = {
  id: number;
  task: string;
  isread: boolean;
};

type props = {
  item: items;
  posStyle: any;
  changecard: (id: number) => void;
  removeCard: (id: number) => void;
  disabled: boolean;
  setDisabled: any;
  title?:string;
  assigned_by?:string
};

const Card = ({
  item,
  posStyle,
  changecard,
  removeCard,
  disabled,
  setDisabled,
  title,
  assigned_by
}: props) => {
  let timerRef: any

  const deleteTask = () => {
    timerRef = setTimeout(() => deleteCardFunction(), 4000);
  };

  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef);
  }, [timerRef]);

  const translateY = useSharedValue<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  let deleteCard = 'false';

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      if (translateY.value < 150) {
        // It ensures that we do not go beyond a certain limit
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      translateY.value = withTiming(0, { easing: Easing.linear });
      if (translateY.value > 100) {
        // item.id required but after removing this the function is not getting called
        runOnJS(changecard)(item.id);
      }
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
    setDisabled(true);
    Toast.show({
      type: 'error',
      text1: 'Marked as done',
      text2: 'Click here to mark undone',
      position: 'bottom',
      bottomOffset: 80,
      onPress: () => {
        Toast.hide();
        deleteCard = 'false';
        setChecked(false);
        setDisabled(false);
      },
    });
    deleteTask();
  };

  const deleteCardFunction = () => {
    if (deleteCard === 'true') {
      removeCard(item.id);
    }
  };

  return (
    <View>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={[CardStyles.card, animatedStyle, { position: posStyle }]}
          >        
            <View style={{ justifyContent: 'center' }}>
              <View style={!item.isread ? { height: 25 } : null}>
                {/* {item.isread && (
                  <Image
                    source={Images.earthIcon}
                    style={[CardStyles.icon, { alignSelf: 'flex-end' }]}
                  />
                )} */}
              </View>
              <View style={CardStyles.flex}>
                <TouchableOpacity onPress={markDone} testID='doneBtn'>
                  <Image
                    source={checked ? Images.checkedIcon : Images.uncheckedIcon}
                    style={[CardStyles.icon, { marginLeft: 5 }]}
                  />
                </TouchableOpacity>
                <Text style={CardStyles.taskText}>{title}</Text>
              </View>
              <View style={CardStyles.assignedTextContainer}>
              <Text style={{fontWeight:'bold'}}>Assigned By: </Text>
              <Text>{assigned_by}</Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default Card;
