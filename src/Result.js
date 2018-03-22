import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';

import ResultDetail from './ResultDetail';
import postImageApi from '../util/postImageApi';
import getResultFromApi from '../util/getImageResultApi';
import getProductAmazon from '../util/getProductAmazon';

export default class ResultScreen extends Component {
  static navigationOptions = {
    title: 'Results',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.picture = params ? params.picture : 'Failure';

    this.retryCounter = 0;
    this.GOHOMEMESSAGE = 'Take a picture once again';

    this.state = {
      analysisUrl: null,
      products: [],
      result: 'processing',
      status: 'null',
    };
  }

  async componentDidMount() {
    this.callPostImageApi();
  }

  get currentView() {
    if (this.state.result === 'error') {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Retry to get the product pages"
            onPress={() => {
              this.setState({ result: 'processing' });
              this.callGetProduct();
            }}
          />
        </View>
      );
    } else if (this.state.result === 'processing') {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#708090" sytle={{ margin: 10 }} />
          <Text>{this.state.status}</Text>
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

  callGetProduct = async () => {
    try {
      this.setState({ status: 'getting the data from amazon' });
      const productResult = await getProductAmazon(this.imageRecognitionResult);

      this.setState({
        products: productResult,
        result: 'success',
      });
    } catch (error) {
      console.warn('amazonError', error);

      if (this.retryCounter >= 2) {
        this.makeModalAlert(this.GOHOMEMESSAGE, this.goBackToCamera);
        return;
      }
      if (error.message === 'We did not find any matches for your request.') {
        // Go to keyword search component
        return;
      }
      this.retryCounter += 1;
      this.setState({ result: 'error' });
    }
  }

  callGetImageResultApi = async () => {
    try {
      this.setState({ status: 'analyzing your image' });
      this.imageRecognitionResult = await getResultFromApi(this.state.analysisUrl, 3000);
      this.callGetProduct();
    } catch (error) {
      console.warn(error);
      this.makeModalAlert(this.GOHOMEMESSAGE, this.goBackToCamera);
    }
  }

  callPostImageApi = async () => {
    try {
      this.setState({ status: 'registering your image' });
      const analysisUrl = await postImageApi(this.picture);
      this.setState({ analysisUrl });
      this.callGetImageResultApi();
    } catch (error) {
      console.warn(error);
      this.makeModalAlert(this.GOHOMEMESSAGE, this.goBackToCamera);
    }
  }

  makeModalAlert = (message, func) => {
    Alert.alert(
      'Error happens',
      message,
      [
        { text: 'OK', onPress: () => func() },
      ],
      { cancelable: false },
    );
  }

  goBackToCamera = () => {
    this.setState({
      analysisUrl: null,
      products: [],
      result: 'processing',
    });
    this.props.navigation.goBack();
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
