
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screen/HomeScreen';
import CountryListScreen from './screen/CountryListScreen';
import CapitalWeatherScreen from './screen/CapitalWeatherScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Assignment' }}
                />
                <Stack.Screen
                    name="CountryListScreen"
                    component={CountryListScreen}
                    options={{ title: 'Weather Report' }}
                />
                <Stack.Screen
                    name="CapitalWeatherScreen"
                    component={CapitalWeatherScreen}
                    options={{ title: 'Capital Weather Report' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}