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
    justifyContent: 'space-evenly',
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

    // const keywordsArray = [];
    // const ref2 = firebase.database().ref().once('value')
    //   .then((item) => {
    //     Object.entries(item._value).forEach(([key, value]) => {
    //       const keywords = `${value.keywords}`;
    //       this.state.keywordsArray.push(keywords);
    //       // console.log('loop keywords: ', this.state.keywordsArray);
    //     });
    //   });

    this.state = {
      recentSearchesArray: ['1', '2', '3'],
      keywordsArray: [],
      keywordsArray2: [],
    };

    console.log('keywords revealssss: ', this.state.keywordsArray);
    console.log('array revealssss: ', this.state.recentSearchesArray);
  }

  componentDidMount() {
    const keywordsArray = [];
    
    // const userId = firebase.auth().currentUser.uid;
    //console.log('keywords userId outputs: ', userId);
    
    const ref2 = firebase.database().ref().once('value')
      .then((item) => {
        this.setState({
          keywordsArray: Object.entries(item._value).map(([key, value]) =>
          //  {
            // console.log("object mapping ", key, value);
            `${value.keywords}`),
          // },
        });
      });
  }

  onListPress = () => {
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
    this.state.keywordsArray2 = this.state.keywordsArray.map(eachPair => eachPair);
    console.log('keywordsarray2 is: ', this.state.keywordsArray2, typeof (this.state.keywordsArray2));
    console.log('recentsearches show is: ', this.state.recentSearchesArray, typeof (this.state.recentSearchesArray));

    // });
  }

  onSubmitButtonPress = () => {
    console.log('send this to KeywordSearch component ');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.defaultButton}>
          <TouchableOpacity
            onPress={() => this.onListPress()}
          >
            <Text style={{ fontSize: 14 }}>
              Select existing keywords to go to keyword search
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.wordButtonContainer}>
            {this.state.keywordsArray.map((eachPair, index) => (
              <Button
                style={this.defaultButton}
                onPress={() => this.onSubmitButtonPress()}
                title={eachPair}
              //
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
