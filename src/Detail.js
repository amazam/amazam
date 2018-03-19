import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';
import axios from 'axios';

// const CLOUDSIGHTSERVER = 'https://api.cloudsight.ai/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-proxy.com/v1/images';
const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-mock.com/v1/images';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.postImageApi = this.postImageApi.bind(this);

    const { params } = this.props.navigation.state;
    this.picture = params ? params.picture : 'Failure';

    this.state = { result: true };
  }

  async componentDidMount() {
    this.postImageApi();
  }

  get currentView() {
    if (this.state.result === false) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Retry"
            onPress={() => this.postImageApi()}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#708090" sytle={{ margin: 10 }} />
        <Button
          title="Go to get the analysis"
          onPress={() => setTimeout(() => this.props.navigation.navigate('Result', {
            url: this.getAnalysisUrl,
          }), 1)}
        />
      </View>
    );
  }

  postImageApi() {
    const sendData = {
      image: `data:image/png;base64,${this.picture}`,
      locale: 'en_US',
    };

    axios.post(CLOUDSIGHTSERVER, {
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => {
        this.getAnalysisUrl = `${CLOUDSIGHTSERVER}/${response.data.token}`;
        this.setState({ result: true });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ result: false });
      });
  }

  render() {
    return this.currentView;
  }
}

export default DetailScreen;
