import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

export default class Result extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.getAnalysisUrl = params ? params.url : 'Failure';

    this.state = { result: null };
  }

  async componentDidMount() {
    const analysisResult = await (await fetch(this.getAnalysisUrl, {
      method: 'GET',
      headers: {
        Authorization: 'CloudSight TLTLd-bLtKFq0y4ZvfuBSA',
        'Cache-Control': 'no-cache',
      },
    })).json();
    console.log(analysisResult);
    
    this.setState({ result: analysisResult.name });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>response: {this.state.result}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
