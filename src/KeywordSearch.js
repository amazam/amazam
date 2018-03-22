import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  StyleSheet,
} from 'react-native';
import Search from 'react-native-search-box';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submitButton: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
    width: 300,
  },
  imageAPIWordButton: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 100,
    width: 200,
  },
});

export default class KeywordSearch extends Component {
  // static navigationOptions = {
  //   title: 'Keyword Search',
  //   headerStyle: { backgroundColor: 'black' },
  //   headerTintColor: 'white',
  //   headerTitleStyle: { color: 'white' },
  // };

  constructor(props) {
    super(props);

    const { imageRecognitionResult } = this.props;
    const recognitionWords = imageRecognitionResult.data.name;
    const splittedArray = recognitionWords.split(' ');
    const wordListWithBoolean = splittedArray.map(eachword => ({
      word: eachword,
      mode: true,
    }));

    this.state = {
      search: '',
      wordCheckList: wordListWithBoolean,
    };
  }

  onButtonPress = (index) => {
    // toggle true/false
    const newWordList = [...this.state.wordCheckList];

    if (newWordList[index].mode) {
      newWordList[index].mode = false;
      this.setState({ wordCheckList: newWordList });
      return;
    }
    newWordList[index].mode = true;

    this.setState({ wordCheckList: newWordList });
  }

  onSubmitButtonPress = () => {
    let combinedWords = '';

    this.state.wordCheckList.forEach((eachPair) => {
      combinedWords += `${eachPair.word} `;
    });
    combinedWords += this.state.search;

    this.props.getSearchText(combinedWords);
  }

  render() {
    return (
      <View style={styles.container}>
        <Search
          ref="search_box"
          onChangeText={() => console.log('on change text')}
          onSearchButtonPress={() => console.log('on search button')}
          onCancelButtonPress={() => console.log('on cancel button')}
        />

        <View style={styles.imageAPIWordButton}>
          {this.state.wordCheckList.map((eachPair, index) => (
            <Button
              onPress={() => this.onButtonPress(index)}
              title={eachPair.word}
            />
          ))}
        </View>

        <View style={styles.submitButton}>
          <Button
            onPress={() => this.onSubmitButtonPress()}
            title="Submit"
          />
        </View>

      </View>
    );
  }
}

KeywordSearch.propTypes = {
  getSearchText: PropTypes.func.isRequired,
  imageRecognitionResult: PropTypes.string.isRequired,
};
