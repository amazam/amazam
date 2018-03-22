import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';

import postImageApi from '../util/postImageApi';
import getResultFromApi from '../util/getImageResultApi';
import getProductAmazon from '../util/getProductAmazon';
import Keyword from './KeywordSearch';
import Result from './Result';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  errorAmazon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
    this.analysisUrl = null;
    this.analysisResult = null;
    this.products = [];

    this.state = {
      result: 'processing',
      status: 'null',
    };
  }

  async componentWillMount() {
    this.callPostImageApi();
  }

  get currentView() {
    if (this.state.result === 'error') {
      return (
        <View style={styles.errorAmazon}>
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#708090" sytle={{ margin: 10 }} />
          <Text>{this.state.status}</Text>
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpg;base64,${this.picture}` }}
          />
        </View>
      );
    } else if (this.state.result === 'finish analysis') {
      return (
        <Keyword
          imageRecognitionResult={this.analysisResult}
        />
      );
    }
    return (
      <Result
        products={this.products}
      />
    );
  }

  callGetProduct = async () => {
    try {
      this.setState({ status: 'getting the data from amazon' });
      const productResult = await getProductAmazon(this.imageRecognitionResult);

      this.setState({ result: 'success' });
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
      this.imageRecognitionResult = await getResultFromApi(this.analysisUrl, 5000);
      console.log('data.token', this.imageRecognitionResult.data.token);
      console.log('data.url', this.imageRecognitionResult.data.url);
      console.log('data.status', this.imageRecognitionResult.data.status);
      console.log('data.name', this.imageRecognitionResult.data.name);
      console.log('status', this.imageRecognitionResult.status);
      console.log('responseURL', this.imageRecognitionResult.request.responseURL);
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
