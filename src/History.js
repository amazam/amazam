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
    justifyContent: 'space-evenly',
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

    this.state = {
      keywordsArray: [],
      ref: '',
    };
    console.log('keywords revealssss: ', this.state.keywordsArray);
  }

  componentDidMount() {
    // const userId = firebase.auth().currentUser.uid;
    // console.log('keywords userId outputs: ', userId);

    this.state.ref = firebase.database().ref().once('value')
      .then((item) => {
        this.setState({
          keywordsArray: Object.entries(item._value).slice(0, 5).map(([key, value]) =>
            `${value.keywords}`),
        });
      });
      console.log("keyword firebase values ", this.state.ref);
  }

  componentWillUnmount() {
    clearInterval(this.state.ref);
  }

  onSubmitButtonPress = () => {
    console.log('send this to KeywordSearch component ');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.wordButtonContainer}>
            {this.state.keywordsArray.map((eachPair, index) => (
              <Animbutton
                onColor="green"
                effect="rotate"
                _onPress={() => this.onSubmitButtonPress(index)}
                text={eachPair}
                key={eachPair}
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
