import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.picture = params ? params.picture : 'Failure';

    this.state = { postImageStatus: null };
  }

  async componentDidMount() {
    const sendData = {
      image: `data:image/png;base64,${this.picture}`,
      locale: 'en_US',
    };

    const postImageResponse = await (await fetch('https://api.cloudsight.ai/v1/images', {
      method: 'POST',
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })).json();
    console.log(postImageResponse);
    this.getAnalysisUrl = `https://api.cloudsight.ai/v1/images/${postImageResponse.token}`;
    this.setState({ postImageStatus: postImageResponse.status });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>response: {this.state.postImageStatus}</Text>
        <Button
          title="Go to get the analysis"
          onPress={() => setTimeout(() => this.props.navigation.navigate('Result', {
            url: this.getAnalysisUrl,
          }), 5000)}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
