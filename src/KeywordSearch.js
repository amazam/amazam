import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  textinput: {
    flex: 0,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
  },
  imageAPIWordButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  outputString: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  submitButton: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
  },
});

export default class KeywordSearch extends Component {
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
      if (eachPair.mode) {
        combinedWords += `${eachPair.word} `;
      }
    });
    combinedWords += this.state.search;

    this.props.getSearchText(combinedWords);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          placeholder="Add some words to search if you want"
          onChangeText={text => this.setState({ search: text })}
        />

        <View style={styles.imageAPIWordButton}>
          {this.state.wordCheckList.map((eachPair, index) => (
            <Button
              key={eachPair.word}
              onPress={() => this.onButtonPress(index)}
              title={eachPair.word}
            />
          ))}
        </View>

        <Text style={styles.imageAPIWordButton}>
          {`${this.state.wordCheckList.filter(eachPair =>
            eachPair.mode).map(eachPair =>
            eachPair.word).join(' ')} ${this.state.search}`}
        </Text>

        <View style={styles.submitButton}>
          <Button
            color="green"
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
};
