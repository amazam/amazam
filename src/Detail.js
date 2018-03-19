import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  CLOUDSIGHT,
  AMAZON_ACCESS_KEY,
  AMAZON_ASSOCIATE_ID,
  AMAZON_SECRET_KEY,
} from 'react-native-dotenv';
import axios from 'axios';

const amazon = require('../util/amazon-product-api');

// const CLOUDSIGHTSERVER = 'https://api.cloudsight.ai/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-proxy.com/v1/images';
const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-mock.com/v1/images';

class DetailScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.picture = params ? params.picture : 'Failure';

    this.state = {
      analysisUrl: null,
      products: [],
      result: true,
    };
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
          onPress={() => this.getProducts()}
        />
      </View>
    );
  }

  getProducts() {
    const client = amazon.createClient({
      awsId: AMAZON_ACCESS_KEY,
      awsSecret: AMAZON_SECRET_KEY,
      awsTag: AMAZON_ASSOCIATE_ID,
    });

    axios.get(this.state.analysisUrl)
      .then((imageResult) => {
        console.log(imageResult);

        client.itemSearch({
          keywords: imageResult.data.name,
          itemPage: '1',
          responseGroup: 'ItemAttributes, Images',
        })
          .then((amazonResult) => {
            this.setState({ products: amazonResult });
            console.log(amazonResult);
          })
          .catch((amazonError) => {
            console.log(amazonError);
          })
          .then(() => {
            setTimeout(() => this.props.navigation.navigate('Result', { products: this.state.products }), 1);
          });
      })
      .catch((imageError) => {
        console.error(imageError);
        this.setState({ result: false });
      });
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
        this.setState({
          analysisUrl: `${CLOUDSIGHTSERVER}/${response.data.token}`,
          result: true,
        });
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
