import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const CLOUDSIGHTSERVER = 'https://api.cloudsight.ai/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-proxy.com/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-mock.com/v1/images';

export default class ResultScreen extends Component {
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
          {this.state.products.map(product =>
            <ResultDetail key={product.ASIN} product={product} />)}
        </ScrollView>
      </View>
    );
  }

  getImageResult() {
    let counter = 0;

    const getResultFromApi = () => {
      counter += 1;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios.get(this.state.analysisUrl, {
            headers: {
              Authorization: `CloudSight ${CLOUDSIGHT}`,
              'Cache-Control': 'no-cache',
            },
          })
            .then((resultData) => {
              if (counter <= 3) {
                switch (resultData.data.status) {
                case 'completed': {
                  resolve(resultData);
                  break;
                }
                case 'not completed': {
                  resolve(getResultFromApi());
                  break;
                }
                default: reject(new Error(resultData.data.status));
                }
              } else {
                reject(new Error('Cannot get the data from image recognition'));
              }
            })
            .catch((imageError) => {
              console.warn(imageError);
              reject(imageError);
            });
        }, 3000);
      });
    };

    getResultFromApi()
      .then((resultFromApi) => {
        this.imageResult = resultFromApi;
        this.getProductResult();
      })
      .catch((error) => {
        console.warn(error);
        this.makeModalAlert();
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
        this.setState({
          products: amazonResult,
          result: 'success',
        });
      })
      .catch((amazonError) => {
        console.warn('amazonError', amazonError);
        this.setState({ result: 'error' });
      });
  }

  postImageApi() {
    axios.post(CLOUDSIGHTSERVER, {
      image: `data:image/png;base64,${this.picture}`,
      locale: 'en_US',
    }, {
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
      },
    })
      .then((response) => {
        this.setState({
          analysisUrl: `${CLOUDSIGHTSERVER}/${response.data.token}`,
        });
        this.getImageResult();
      })
      .catch((error) => {
        console.warn(error);
        this.makeModalAlert();
      });
  }

  makeModalAlert() {
    Alert.alert(
      'Error happens',
      'Take a picture once again',
      [
        { text: 'OK', onPress: () => this.props.navigation.goBack() },
      ],
      { cancelable: false },
    );
  }

  render() {
    return this.currentView;
  }
}

ResultScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
    isFocused: PropTypes.func,
    navigate: PropTypes.func,
    pop: PropTypes.func,
    popToTop: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      params: PropTypes.shape({
        picture: PropTypes.string,
      }),
      routeName: PropTypes.string,
    }),
  }).isRequired,
};
