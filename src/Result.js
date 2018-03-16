import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';
import getResultAmazon from '../util/index';

export default class Result extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.getAnalysisUrl = params ? params.url : 'Failure';

    this.state = { item: [] };
  }

  async componentDidMount() {
    const analysisResult = await (await fetch(this.getAnalysisUrl, {
      method: 'GET',
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
      },
    })).json();

    const amazonResult = await getResultAmazon(analysisResult.name);
    this.setState({ item: amazonResult });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello</Text>
        <FlatList
          data={this.state.item.map(eachItem => ({ key: eachItem.DetailPageURL[0] }))}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
