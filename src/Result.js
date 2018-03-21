import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
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

    this.state = {
      analysisUrl: null,
      products: [],
      result: 'processing',
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
      const productResult = await getProductAmazon(this.imageRecognitionResult);

      this.setState({
        products: productResult,
        result: 'success',
      });
    } catch (error) {
      console.warn('amazonError', error);
      this.setState({ result: 'error' });
    }
  }

  callGetImageResultApi = async () => {
    try {
      this.imageRecognitionResult = await getResultFromApi(this.state.analysisUrl, 5000);
      this.callGetProduct();
    } catch (error) {
      console.warn(error);
      this.makeModalAlert();
    }
  }

  callPostImageApi = async () => {
    try {
      const analysisUrl = await postImageApi(this.picture);
      this.setState({ analysisUrl });
      this.callGetImageResultApi();
    } catch (error) {
      console.warn(error);
      this.makeModalAlert();
    }
  }

  makeModalAlert = () => {
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
