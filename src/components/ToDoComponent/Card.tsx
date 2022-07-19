import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { cos, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Images from '../../constants/images/Image'
import Toast from 'react-native-toast-message';

const Card = ({item, posStyle, changecard, removeCard}: any) => {
    const translateY = useSharedValue(0)
    const [checked, setChecked] = useState(false)
    let deleteCard = "false"
    
    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateY.value = event.translationY
        },
        onEnd: () => {
            translateY.value = withTiming(0, {
                duration: 700,
        })
            runOnJS(changecard)(item.id)
        }
    })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: translateY.value
        }],
    }))

    const markDone = () => {
        deleteCard = "true"
        setChecked(true)
        Toast.show({
            type: 'error',
            text1: 'Mark as done',
            text2: "Click here to mark undone",
            position: 'bottom',
            bottomOffset: 80,
            onPress: () => {
                Toast.hide()
                deleteCard = "false"
                setChecked(false)
            },
        });
        setTimeout(() => {
            if(deleteCard === "true") {
                changecard(item.id)
                removeCard(item.id)
            }
        }, 4000)
    }

    
    return (
        <View>
            <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={panGesture}>
                    <Animated.View style={[styles.card, animatedStyle, {position: posStyle}]}>
                        <View style={{justifyContent: 'center'}}>
                            <View>
                            {item.isread &&
                                    <Image 
                                        source={Images.earthIcon}
                                        style={[styles.icon, {alignSelf: 'flex-end'}]}
                                    />
                                }
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                                <TouchableOpacity
                                    onPress={markDone}
                                >
                                    {checked ? (
                                        <Image 
                                        source={Images.checkedIcon}
                                        style={[styles.icon, {marginLeft: 5}]}
                                        />): (
                                            <Image 
                                                source={Images.uncheckedIcon}
                                                style={[styles.icon, {marginLeft: 5}]}
                                            />
                                        )
                                    }
                                    
                                </TouchableOpacity>
                                <Text style={{fontSize: 18, color: "#252525", fontWeight: 'bold'}}>{item.task}</Text>
                            </View>
                            <Image 
                                source={Images.externalLinkIcon}
                                style={[styles.icon, {alignSelf: 'flex-end'}]}
                            />
                        </View>
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        width: "90%",
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 20,
        alignSelf: "center",
        // Shadow for iOS
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // // Shadow for Android
        elevation: 5,
        position: 'relative',
        backgroundColor: "#fff",
        zIndex: -2
    },
    icon: {
        resizeMode: 'cover',
        width: 25,
        height: 25,
        marginRight: 5
    }
})