import React from 'react';
import { View, StyleSheet, Text, Button, TextInput, Alert, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';


import * as Constants from '../constants'

export default class LoginScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            asteroidId: '',
            countryName: '',
            isDataEmpty: false
        };
    }

    callAPI(action) {
        let url;
        if (action == 'login') {
            url = Constants.BASE_URL + this.state.asteroidId + '?api_key=' + Constants.API_KEY;
        } else if (action == 'random') {
            url = Constants.BASE_URL + 'browse?api_key=DEMO_KEY';
        } else if (action == 'country') {
            url = Constants.BASE_URL_COUNTRY + this.state.countryName;
        }
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json) => {
                debugger
                if (action == 'login') {
                    this.props.navigation.navigate('DashboardScreen', { key: 'known', data: json.json })
                } else if (action == 'random') {
                    this.props.navigation.navigate('DashboardScreen', { key: 'random', data: json.json });
                } else if (action == 'country') {
                    let countryData = json.json.filter((el) => {
                        return el.name.toLowerCase() == this.state.countryName.toLowerCase()
                    })
                    countryData.length > 0 ?
                        this.props.navigation.navigate('DashboardScreen', { key: 'country', data: countryData[0] })
                        :
                        this.setState({ isDataEmpty: true })
                }

                this.setState({ asteroidId: '', countryName: '' });
            })
            .then(response => { console.log(response) }, error => { console.log(error); alert("server error") });
    }
    login() {
        this.callAPI('login');
    }

    getCountryData() {
        this.callAPI('country')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* <View style={{ width: '90%' }}>
                        <TextInput
                            style={{
                                height: 40, borderBottomColor: '#000000',
                                borderBottomWidth: 1, marginBottom: 20
                            }}
                            placeholder={"Enter Asteroid ID"}
                            onChangeText={text => this.setState({ asteroidId: text })}
                            value={this.state.asteroidId}
                        />
                        <Button
                            title="Submit"
                            onPress={() => this.login()}
                            disabled={!this.state.asteroidId.length ? true : false}
                        />
                        <View style={{ paddingTop: 20 }}>
                            <Button
                                title="Random Asteroid"
                                onPress={() => this.callAPI('random')}
                            />
                        </View>
                    </View> */}
                    <View style={{ width: '90%' }}>
                        <TextInput
                            style={{
                                height: 40, borderBottomColor: '#000000',
                                borderBottomWidth: 1, marginBottom: 20
                            }}
                            placeholder={"Enter country name"}
                            onChangeText={text => this.setState({ countryName: text })}
                            value={this.state.countryName}
                        />
                        <Button
                            title="Submit"
                            onPress={() => this.getCountryData()}
                            disabled={!(this.state.countryName.length > 2) ? true : false}
                        />

                    </View>

                </View>
                {this.state.isDataEmpty &&
                    <View style={{ flex: 0.5, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>No Record Found</Text>
                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});