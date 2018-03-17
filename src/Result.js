import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';
import getResultAmazon from '../util/index';

class ResultScreen extends Component {
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

    console.log('RESULT COMPONENT:', this.getAnalysisUrl);

    const amazonResult = await getResultAmazon(analysisResult.name);
    this.setState({ item: amazonResult });

    console.log('########## AMAZON RESULT- START ##########');
    console.log(amazonResult);
    console.log('########## AMAZON RESULT - END ##########');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello</Text>
        <FlatList
          data={this.state.item.map(eachItem => ({ key: eachItem.DetailPageURL[0] }))}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    );
  }
}

export default ResultScreen;
