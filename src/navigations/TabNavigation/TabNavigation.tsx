import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Image, Text, Platform } from 'react-native';
import Colors from '../../constants/colors/Colors';
import Fonts from '../../constants/fonts/TabFont';
import Images from '../../constants/images/Image';
import Strings from '../../i18n/en';
import { TabViewStyle } from './style';
import GoalsScreenStack from '../../screens/GoalScreen/GoalScreen';
import HomeScreenV2 from '../../screens/HomeScreen/HomeScreenV2';
import { useSelector } from 'react-redux';
import { AllTaskScreenStack } from '../../screens/Stacks/AllStack';
import { scale } from '../../utils/utils';
import CalendarInviteScreen from '../../screens/Calendar/CalendarInviteScreen';

const tab = createBottomTabNavigator();

const renderLabel = ({
  focused,
  tabName,
}: {
  focused?: boolean;
  tabName: string;
}) => (
  <Text
    style={{
      fontSize: Fonts.Tab_Text_Font,
      color: focused ? Colors.Tab_Active_Color : Colors.Tab_Inactive_Color,
    }}
  >
    {tabName}
  </Text>
);

const renderIcon = ({ tabIcon }: { tabIcon: any }) => {
  return <Image style={TabViewStyle.tab_icon} source={tabIcon} />;
};
const TabNavigation = () => {
  const { isProdEnvironment } = useSelector(
    (store: { localFeatureFlag: any }) => store.localFeatureFlag,
  );

  return (
    <NavigationContainer independent>
      <tab.Navigator
        initialRouteName={Strings.Tab_Calendar}
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: scale(55),
          },
        })}
      >
        <tab.Screen
          name={Strings.Tab_Home}
          component={HomeScreenV2}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) =>
              renderLabel({ focused, tabName: Strings.Tab_Home }),
            tabBarIcon: ({ focused }) =>
              renderIcon({
                tabIcon: focused ? Images.homeIcon : Images.homeIconUnF,
              }),
          }}
        />

        <tab.Screen
          name={Strings.Tab_Calendar}
          component={CalendarInviteScreen}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) =>
              renderLabel({ focused, tabName: Strings.Tab_Calendar }),
            tabBarIcon: () => renderIcon({ tabIcon: Images.calendar }),
          }}
        />

        {!isProdEnvironment && (
          <tab.Screen
            name={Strings.Tab_Goal}
            component={GoalsScreenStack}
            options={{
              headerShown: false,

              tabBarLabel: ({ focused }) =>
                renderLabel({ focused, tabName: Strings.Tab_Goal }),

              tabBarIcon: ({ focused }) =>
                renderIcon({
                  tabIcon: focused ? Images.goalIcon : Images.goalIconUnF,
                }),
            }}
          />
        )}

        <tab.Screen
          name={Strings.Tab_Profile}
          component={AllTaskScreenStack}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) =>
              renderLabel({ focused, tabName: Strings.Tab_Profile }),

            tabBarIcon: ({ focused }) =>
              renderIcon({
                tabIcon: focused ? Images.profileIcon : Images.profileIconUnF,
              }),
          }}
        />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
