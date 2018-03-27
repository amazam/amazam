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
import Animbutton from './AnimButton';

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
    alignItems: 'center',
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

    const keywordsArray = [];
    const ref2 = firebase.database().ref().once('value')
      .then((item) => {
        Object.entries(item._value).forEach(([key, value]) => {
          const keywords = `${value.keywords}`;
          this.state.keywordsArray.push(keywords);
        });
        console.log('keywords revealssss: ', this.state.keywordsArray);
      });


    this.state = {
      recentSearches: '',
      keywordsArray,
    };
  }

  onSubmitButtonPress = () => {
    // Get a reference to the database service
    // const database = firebase.database();
    // const ref = firebase.database().ref();

    // console.log('database is :', database);
    // console.log('db ref is: ', ref);
    // const keywordsArray = [];
    // const keywords;

    // const ref2 = firebase.database().ref().once('value')
    //   .then((item) => {
    //     Object.entries(item._value).forEach(([key, value]) => {
    //       const keywords = `${value.keywords}`;
    //       this.state.keywordsArray.push(keywords);
    //     });
    console.log('send this to KeywordSearch component ');

    console.log('mapping ', this.state.keywordsArray.map(eachPair => eachPair));
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.defaultButton}>
          <TouchableOpacity
            onPress={() => this.onSubmitButtonPress()}
          >
            <Text style={{ fontSize: 14 }}>
              Select existing keywords to go to keyword search
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.wordButtonContainer}>
            {this.state.keywordsArray.map(eachPair => (
              <Button
                onPress={() => this.onSubmitButtonPress()}
                title={eachPair}
              />
            )) }
          </View>
        </ScrollView>
      </View>
    );
  }
}

History.propTypes = {
  // getSearchText: PropTypes.func.isRequired,
};
