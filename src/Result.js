import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';
import generateUrl from '../util/index';

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

    console.log(analysisResult);

    const amazonUrl = generateUrl(analysisResult.name);
    console.log(amazonUrl);

    const amazonResult = await (await fetch(amazonUrl)).text();
    console.log(amazonResult);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello</Text>
        {/* <FlatList
          data={[]}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        /> */}
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
