import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TextInput, Alert } from 'react-native';
import { Container, Content, Form } from 'native-base';

import * as Constants from '../constants'

export default class LoginScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userID: '',
            password: '',
            asteroidId: ''
        };
    }
    payloadData = {};


    componentDidMount() {
        debugger

        // this.callAPI('company');
    }


    callAPI(action) {
        let url;
        debugger
        if (action == 'login') {
            url = Constants.BASE_URL + this.state.asteroidId + '?api_key=' + Constants.API_KEY;

        } else if (action == 'random') {
            url = Constants.BASE_URL + 'browse?api_key=' + Constants.API_KEY;
        }

        const api = fetch(
            url
        );
        api.then((response) => response.json())
            .then((json) => {
                if (action == 'login') {
                    debugger
                    data = {
                        name: json.name,
                        nasa_jpl_url: json.nasa_jpl_url,
                        is_potentially_hazardous_asteroid: json.is_potentially_hazardous_asteroid
                    };
                    this.props.navigation.navigate('DashboardScreen', { known: json })
                } else if (action == 'random') {
                    
                }
                // this.setState({ data: json.movies });

            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });

    }

    login() {
        this.callAPI('login');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={styles.content}>
                    <Form style={{ width: '90%' }}>
                        <ScrollView >
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
                                // onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
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
                    </Form>
                </Content>

            </Container>
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
    },
    button: {
        width: 208,
        height: 40,
        borderRadius: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 24
    },

});