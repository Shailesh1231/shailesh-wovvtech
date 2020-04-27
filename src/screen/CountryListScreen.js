import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text, Button, Image, FlatList } from 'react-native';
// import SvgUri from 'react-native-svg-uri';
import { SvgUri } from 'react-native-svg';


import * as Constants from '../constants'

export default class CountryListScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            countryName: '',
            capital: '',
            flagUrl: '',
            temperature: '',
            weatherIconUrl: ''
        };
    }
    componentDidMount() {
        debugger
    }

    callAPI(action, id) {
        let url;
        if (action == 'known') {
            url = Constants.BASE_URL + id + '?api_key=' + Constants.API_KEY;
        } else if (action == 'cityWeather') {
            url = Constants.BASE_URL_CITY + 'access_key=' + Constants.COUNTRY_API_KEY + '&QUERY=' + id.capital;
        }
        this.setState({ isLoading: true })
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json) => {
                debugger
                if (action == 'cityWeather') {
                    this.setState({ isLoading: false })
                    this.props.navigation.navigate('CapitalWeatherScreen', { data: json.json })
                } else {
                    this.setState({ asteroidName: json.json.name, asteroidUrl: json.json.nasa_jpl_url, isHazardous: json.json.is_potentially_hazardous_asteroid });
                }
            })
            .then(response => { console.log(response) }, error => { console.log(error); alert("Server Error") });
    }

    renderCountry() {
        debugger
        return (
            <View>
                <FlatList
                    data={this.props.route.params.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <>
                            <View style={{ width: '99%', marginBottom: 5, padding: 10, alignSelf: 'center', height: 'auto', borderRadius: 5, borderColor: 'grey', borderWidth: 1 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingBottom: 5 }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text>Capital : {item.capital}</Text>
                                            <Text>Population: {item.population}</Text>
                                            <Text>Latlng : {item.latlng}</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <View style={{ alignItems: 'center' }}>
                                                <SvgUri
                                                    width="50%"
                                                    height="50"
                                                    uri={item.flag}
                                                    viewbox="0 0 32 32"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ marginTop: 10 }}>
                                    <Button
                                        title="Capital Weather"
                                        onPress={() => this.callAPI('cityWeather', item)}
                                    />
                                </View>
                            </View>
                        </>

                    }
                />
            </View>
        )
    }

    render() {
        const { route } = this.props;
        return (
            <>
                {this.state.isLoading ? <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                </View>
                    :
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
                            this.renderCountry()
                        }
                    </View>
                }
            </>
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
    loader: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
});