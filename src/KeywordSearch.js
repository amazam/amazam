import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Text,
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
  static navigationOptions = {
    title: 'Keyword Search',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      search: '',
      wordCheckList: [],
    };
  }

  onButtonPress = () => {
    // toggle true/false
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
            onPress={this.onButtonPress}
            title="Android"
          />

          <Button
            onPress={this.onButtonPress}
            title="phone"
          />

        </View>

        <View style={styles.submitButton}>
          <Button
            onPress={this.onButtonPress}
            title="Submit"
          />
        </View>

      </View>
    );
  }
}
