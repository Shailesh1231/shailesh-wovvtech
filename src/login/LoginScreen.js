import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TextInput, Alert } from 'react-native';

import * as Constants from '../constants'

export default class LoginScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            asteroidId: ''
        };
    }

    callAPI(action) {
        let url;
        if (action == 'login') {
            url = Constants.BASE_URL + this.state.asteroidId + '?api_key=' + Constants.API_KEY;
        } else if (action == 'random') {
            url = Constants.BASE_URL + 'browse?api_key=DEMO_KEY';
        }
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json, response) => {
                if (action == 'login') {
                    this.props.navigation.navigate('DashboardScreen', { key: 'known', data: json.json })
                } else if (action == 'random') {
                    this.props.navigation.navigate('DashboardScreen', { key: 'random', data: json.json });
                }
                this.setState({ asteroidId: '' });
            })
            .then(response => { console.log(response) }, error => { alert("Invalid asteroid id") });
    }
    login() {
        this.callAPI('login');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ width: '90%' }}>
                        <ScrollView>
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
                                disabled={!this.state.asteroidId ? true : false}
                            />
                            <View style={{ paddingTop: 20 }}>
                                <Button
                                    title="Random Asteroid"
                                    onPress={() => this.callAPI('random')}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
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