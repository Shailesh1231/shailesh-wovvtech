import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import * as Constants from '../constants'

export default class DashboardScreen extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // isLoading: false,
            asteroidName: '',
            asteroidUrl: '',
            isHazardous: ''
        };
    }
    componentDidMount() {
        if (this.props.route.params.key == 'random') {
            let randomKey = Math.floor(Math.random() * this.props.route.params.data.near_earth_objects.length)
            var randomAsteroidId = this.props.route.params.data.near_earth_objects[randomKey].id;
            this.callAPI('known', randomAsteroidId);
        }
    }

    callAPI(action, id) {
        let url;
        if (action == 'known') {
            url = Constants.BASE_URL + id + '?api_key=' + Constants.API_KEY;
        }
        const api = fetch(
            url
        );
        api.then((response) => response.json().then(json => ({ json, response })))
            .then((json, response) => {
                this.setState({ asteroidName: json.json.name, asteroidUrl: json.json.nasa_jpl_url, isHazardous: json.json.is_potentially_hazardous_asteroid });
            })
            .then(response => { console.log(response) }, error => { alert("Invalid asteroid id") });
    }

    login() {
        this.callAPI('login');
    }

    render() {
        const { route } = this.props;
        return (
            <View style={styles.container}>
                {route.params.key == 'known' ?
                    <View>
                        <Text>Name : {route.params.data.name}</Text>
                        <Text>URL: {route.params.data.nasa_jpl_url}</Text>
                        <Text>Dangerious : {route.params.data.is_potentially_hazardous_asteroid.toString()}</Text>
                    </View>
                    :
                    <View>
                        <Text>Name : {this.state.asteroidName}</Text>
                        <Text>URL: {this.state.asteroidUrl}</Text>
                        <Text>Dangerious : {this.state.isHazardous.toString()}</Text>
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
    }
});