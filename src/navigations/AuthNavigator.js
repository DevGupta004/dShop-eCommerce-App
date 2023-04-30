import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, ForgotPassword, Register, Wallet, Notifications, Profile} from '../screens';
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false,
    }}
    initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({route}) => ({
          headerTintColor: COLORS.white,
          headerBackTitle: 'Back',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          title: route.params.userId,
        })}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />


      <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
