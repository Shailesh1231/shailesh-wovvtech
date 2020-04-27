
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './login/LoginScreen';
import DashboardScreen from './dashboard/DashboardScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: 'Assignment' }}
                />
                <Stack.Screen
                    name="DashboardScreen"
                    component={DashboardScreen}
                    options={{ title: 'Weather Report' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}