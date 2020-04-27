import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';


import * as Constants from '../constants'

export default class DashboardScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // isLoading: false,
            asteroidName: '',
            asteroidUrl: '',
            isHazardous: '',
            countryName: '',
            capital: '',
            population: '',
            latlng: '',
            flagUrl: '',
            temperature: '',
            weatherIconUrl: '',
            windSpeed: '',
            precip: '',
            isShowCapital: false
        };
    }
    componentDidMount() {
        debugger
        const { data } = this.props.route.params;
        if (this.props.route.params.key == 'random') {
            let randomKey = Math.floor(Math.random() * data.near_earth_objects.length)
            var randomAsteroidId = data.near_earth_objects[randomKey].id;
            this.callAPI('known', randomAsteroidId);
        } else if (this.props.route.params.key == 'random') {
            this.setState({
                asteroidName: data.name,
                asteroidUrl: data.nasa_jpl_url,
                isHazardous: data.is_potentially_hazardous_asteroid
            })
        } else if (this.props.route.params.key == 'country') {

            this.setState({
                countryName: data.name,
                capital: data.capital,
                population: data.population,
                latlng: data.latlng,
                flagUrl: data.flag,
            })
        }
    }

    callAPI(action, id) {
        let url;
        if (action == 'known') {
            url = Constants.BASE_URL + id + '?api_key=' + Constants.API_KEY;
        } else if (action == 'cityWeather') {
            url = Constants.BASE_URL_CITY + 'access_key=' + Constants.COUNTRY_API_KEY + '&QUERY=' + this.props.route.params.data.capital;
        }
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json) => {
                debugger
                if (action == 'cityWeather') {

                    this.setState({
                        temperature: json.json.current.temperature,
                        weatherIconUrl: json.json.current.weather_icons[0],
                        windSpeed: json.json.current.wind_speed,
                        precip: json.json.current.precip,
                        isShowCapital: true
                    });
                } else {
                    this.setState({ asteroidName: json.json.name, asteroidUrl: json.json.nasa_jpl_url, isHazardous: json.json.is_potentially_hazardous_asteroid });
                }
            })
            .then(response => { console.log(response) }, error => { console.log(error); alert("Server Error") });
    }

    render() {
        const { route } = this.props;
        return (
            <View style={styles.container}>
                {route.params.key == 'random' || route.params.key == 'known' ?
                    <>
                        <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>Name : {this.state.asteroidName}</Text>
                        <View style={{ width: '99%', padding: 10, alignSelf: 'center', height: 'auto', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                            <Text>Name : {this.state.asteroidName}</Text>
                            <Text>URL: {this.state.asteroidUrl}</Text>
                            <Text>Dangerious : {this.state.isHazardous.toString()}</Text>
                        </View>
                    </>
                    :
                    <View style={{ flex: 0.5 }}>
                        <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>Name : {this.state.countryName}</Text>
                        <View style={{ width: '99%', padding: 10, alignSelf: 'center', height: 'auto', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                            <Text>Capital : {this.state.capital}</Text>
                            <Text>Population: {this.state.population}</Text>
                            <Text>Latlng : {this.state.latlng}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Flag : </Text>
                                <SvgUri
                                    width="50"
                                    height="50"
                                    source={this.state.flagUrl ? { uri: this.state.flagUrl } : null}
                                />
                            </View>
                            {/* <Image
                                style={styles.tinyLogo}
                                source={this.state.flagUrl ? { uri: this.state.flagUrl } : null}
                            /> */}
                            <View style={{ marginTop: 10 }}>
                                <Button
                                    style={{ width: "50%" }}
                                    title="Capital Weather"
                                    onPress={() => this.callAPI('cityWeather')}
                                />
                            </View>
                        </View>
                    </View>
                }
                {this.state.isShowCapital &&
                    <View style={{ flex: 0.5 }}>
                        <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>Capital : {this.state.capital}</Text>
                        <View style={{ width: '99%', padding: 10, alignSelf: 'center', height: 'auto', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                            <Text>temperature : {this.state.temperature}</Text>

                            <Text>Wind Speed : {this.state.windSpeed}</Text>
                            <Text>Precip : {this.state.precip}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Weather Icon: </Text>
                                <Image
                                    style={styles.tinyLogo}
                                    source={this.state.weatherIconUrl ? { uri: this.state.weatherIconUrl } : null}
                                />
                            </View>
                        </View>
                    </View>
                }
            </View>
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