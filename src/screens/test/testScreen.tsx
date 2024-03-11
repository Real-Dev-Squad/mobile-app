import { ScrollView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const testScreen = () => {
  const isFocused = useIsFocused();
  // const apiCallIntervalRef = useRef(null);
  const makeAPICall = () => {
    // Your API call logic here
    console.log('API call triggered');
  };

  // useEffect to start the interval when the component mounts
  useEffect(() => {
    let apiCallInterval;
    if (isFocused) {
      apiCallInterval = setInterval(() => {
        makeAPICall();
      }, 1000); // 5 minutes in milliseconds
    } else {
      console.log('no calls');
    }

    // useEffect cleanup function to clear the interval when the component unmounts
    return () => clearInterval(apiCallInterval);
  }, [isFocused]); // Empty dependency array ensures that the effect runs only once when the component mounts
  // useFocusEffect(() => {
  //   // Cleanup function to clear the interval when the component loses focus (tab switch)
  //   return () => clearInterval(apiCallIntervalRef.current);
  // });
  // const postCallIn5Min = () => {
  //   setInterval(() => {
  //     console.log('posting online users in db');
  //   }, 5000);
  // };
  let dummyArr: [] = [];
  dummyArr.length = 100;
  dummyArr.fill(6);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={50}
      onScroll={(event) => {
        console.log({ y: event.nativeEvent.contentOffset.y });
      }}
      // ref={ScrollViewRef}
    >
      {dummyArr.map((ele) => (
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>
          {ele}
        </Text>
      ))}
    </ScrollView>
  );
};

export default testScreen;

const styles = StyleSheet.create({});
