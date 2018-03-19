import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  View,
} from 'react-native';
import axios from 'axios';
import {
  CLOUDSIGHT,
  AMAZON_ACCESS_KEY,
  AMAZON_ASSOCIATE_ID,
  AMAZON_SECRET_KEY,
} from 'react-native-dotenv';

import ResultDetail from './ResultDetail';

const amazon = require('../util/amazon-product-api');

// const CLOUDSIGHTSERVER = 'https://api.cloudsight.ai/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-proxy.com/v1/images';
const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-mock.com/v1/images';

class ResultScreen extends Component {
  static navigationOptions = {
    title: 'Which do you want to buy?',
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.picture = params ? params.picture : 'Failure';

    this.state = {
      analysisUrl: null,
      products: [],
      result: 'processing',
    };
  }

  async componentDidMount() {
    this.postImageApi();
  }

  get currentView() {
    if (this.state.result === 'error') {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Retry to get the product pages"
            onPress={() => {
              this.setState({ result: 'processing' });
              this.getProductResult();
            }}
          />
        </View>
      );
    } else if (this.state.result === 'processing') {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#708090" sytle={{ margin: 10 }} />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderProducts()}
        </ScrollView>
      </View>
    );
  }

  getImageResult() {
    axios.get(this.state.analysisUrl)
      .then((_imageResult) => {
        console.log(_imageResult);
        this.imageResult = _imageResult;
        this.getProductResult();
      })
      .catch((imageError) => {
        Alert.alert(
          'Error happens',
          'Take a picture once again',
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()}
          ],
          { cancelable: false },
        );
      });
  }

  getProductResult() {
    const client = amazon.createClient({
      awsId: AMAZON_ACCESS_KEY,
      awsSecret: AMAZON_SECRET_KEY,
      awsTag: AMAZON_ASSOCIATE_ID,
    });

    client.itemSearch({
      keywords: this.imageResult.data.name,
      itemPage: '1',
      responseGroup: 'ItemAttributes, Images',
    })
      .then((amazonResult) => {
        console.log(amazonResult);
        this.setState({
          products: amazonResult,
          result: 'success',
        });
      })
      .catch((amazonError) => {
        console.log('aaaaaaaaa', amazonError);
        this.setState({ result: 'error' });
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
        });
        this.getImageResult();
      })
      .catch((error) => {
        Alert.alert(
          'Error happens',
          'Take a picture once again',
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()}
          ],
          { cancelable: false },
        );
      });
  }

  renderProducts() {
    return this.state.products.map(product =>
      <ResultDetail key={product.ASIN} product={product} />);
  }

  render() {
    return this.currentView;
  }
}

export default ResultScreen;
