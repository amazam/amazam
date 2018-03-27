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

  onSubmitButtonPress = () => {
    // let combinedWords = '';

    // this.state.wordCheckList.forEach((eachPair) => {
    //   if (eachPair.mode) {
    //     combinedWords += `${eachPair.word} `;
    //   }
    // });
    // combinedWords += this.state.search;

    // this.props.getSearchText(combinedWords);

    // Get a reference to the database service
    const database = firebase.database();
    const ref = firebase.database().ref();

    // console.log('database is :', database);

    // console.log('db ref is: ', ref);
    
    const ref2 = firebase.database().ref().once('value')
      .then((item) => {
      //  console.log('item shows:::::: ', item, item.key, item._value);
      let keywordsArray = [];
        // console.log('object iteration reveals ', Object.entries(item._value).forEach(([key, value]) => console.log(`${key}: ${value}`)));
        Object.entries(item._value).forEach(([key, value]) => {
         // console.log(`${key}: ${value.keywords}`);
          keywords = `${value.keywords}`;
          keywordsArray.push(keywords);
          // console.log(outputKeyWords);
          // return outputKeyWords;
        });
        // let keywordsFromObject;


        // for (const userID in item._value) {
          // keywordsFromObject = userID[keywords];
        console.log("userID revealssss: ", keywords, keywordsArray);
        // }
        // const historyData = {
        //   item
        // }
      });

    console.log('db ref22222 is: ', ref2);
    // const timestamp = new Date();

    // firebase.auth()
    //   .signInAnonymouslyAndRetrieveData()
    //   .then((credential) => {
    //     if (credential) {
    //       const analyticsData = {
    //         userId: credential.user.uid,
    //         // keywords: combinedWords,
    //         timestamp,
    //       };
    //       ref.push(analyticsData);
    //     }
    //   });
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
              onPress={() => this.onSubmitButtonPress()}
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
