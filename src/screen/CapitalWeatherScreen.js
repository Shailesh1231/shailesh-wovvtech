import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import * as Constants from '../constants'

export default class CapitalWeatherScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            countryName: '',
            capital: '',
            temperature: '',
            weatherIconUrl: '',
            windSpeed: '',
            precip: '',
        };
    }

    render() {
        const { data } = this.props.route.params;

        return (
            <View style={styles.container}>

                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Country :  {data.location.country}</Text>
                    <Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>Capital : {data.location.name}</Text>
                    <View style={{ flexDirection: 'row', padding: 10, alignSelf: 'center', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                        <View style={{ flex: 0.5, }}>
                            <Text>temperature : {data.current.temperature}</Text>

                            <Text>Wind Speed : {data.current.wind_speed}</Text>
                            <Text>Precip : {data.current.precip}</Text>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={styles.tinyLogo}
                                source={data.current.weather_icons[0] ? { uri: data.current.weather_icons[0] } : null}
                            />
                        </View>
                    </View>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});