import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TextInput, Alert } from 'react-native';
import { Container, Content, Form } from 'native-base';

import * as Constants from '../constants'

export default class DashboardScreen extends React.PureComponent {

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
                if(action == 'login'){
                    
                }
                // this.setState({ data: json.movies });
                debugger
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
                            <Text>Name</Text>
                            <Text>URL</Text>
                            <Text>Dangerious</Text>
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