import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  wordButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  defaultButton: {
    flex: 0,
    flexDirection: 'column',
    
  },
  textStyle: {
    fontSize: 16,
    color: '#039BE5',
  },
});


export default class History extends Component {
  static navigationOptions = {
    title: 'View key word search history',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  };

  constructor(props) {
    super(props);
    const { imageRecognitionResult } = this.props;

    this.state = {
      recentSearches: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wordButtonContainer}>
          <View style={styles.defaultButton}>
            <TouchableOpacity
              onPress={() => console.log('history button pressed')}
            >
              <Text style={{ fontSize: 14 }}>
          first keywords history
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('history button pressed')}
            >
              <Text style={{ fontSize: 14 }}>
          second keywords history
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

History.propTypes = {
  // getSearchText: PropTypes.func.isRequired,
};
