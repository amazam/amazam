import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  CameraRoll,
  Text,
  Button,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import SearchBar from 'react-native-search-bar';
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
  static navigationOptions = {
    title: 'Keyword Search',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.string = params ? params.string : 'Failure';

    this.state = {
      search: "Type words for Amazon listingss"
      searchBar: null,
      wordCheckList: [],
      submitButton: null,
      imageAPIWordButtonColor: 'blue', // default button color goes here
      submitButtonColor: 'green', // default button color goes here
    };
  }

  onButtonPress = () => {
    this.setState({ imageAPIWordButtonColor: 'red' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Search
          ref="search_box"
          onChangeText={search => this.setState({ search })}
          onSearchButtonPress={() => console.log("on search button")}
          onCancelButtonPress={() => console.log("on cancel button")}
        />


        <View style={styles.imageAPIWordButton}>
          <Button
            color={this.state.imageAPIWordButtonColor}
            onPress={this.onButtonPress}
            title="Android"

          />

          <Button
            color={this.state.imageAPIWordButtonColor}
            onPress={this.onButtonPress}
            title="phone"
          />


        </View>

        <View style={styles.submitButton}>
          <Button
            color={this.state.submitButtonColor}
            onPress={this.onButtonPress}
            title="Submit"
          />
        </View>

      </View>
    );
  }
}
