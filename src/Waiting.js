import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
  Text,
  View,
  Image,
} from 'react-native';

import postImageApi from '../util/postImageApi';
import getResultFromApi from '../util/getImageResultApi';
import getProductAmazon from '../util/getProductAmazon';
import cancelPromise from '../util/cancelPromise';
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
  imageRotate: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    resizeMode: 'contain',
    transform: [{ rotate: '90deg' }],
  },
  errorAmazon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class WaitingScreen extends Component {
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
    this.pictureOrientation = params ? params.orientation : null;

    this.retryCounter = 0;
    this.GOHOMEMESSAGE = 'Take a picture again.';
    this.analysisResult = null;
    this.products = null;
    this.wrappedPostImagePromise = null;
    this.wrappedGetAnalysisPromise = null;
    this.wrappedGetProductPromise = null;

    this.state = {
      result: 'processing',
      status: 'null',
    };
  }

  componentDidMount() {
    this.callPostImageApi();
  }

  componentWillUnmount() {
    if (this.wrappedPostImagePromise != null) {
      this.wrappedPostImagePromise.cancel();
    }
    if (this.wrappedGetAnalysisPromise != null) {
      this.wrappedGetAnalysisPromise.cancel();
    }
    if (this.wrappedGetProductPromise != null) {
      this.wrappedGetProductPromise.cancel();
    }
  }

  get currentView() {
    if (this.state.result === 'error') {
      return (
        <View style={styles.errorAmazon}>
          <Button
            title="Retry to get the product pages."
            onPress={() => {
              this.setState({ result: 'processing' });
              this.callGetProduct();
            }}
          />
        </View>
      );
    } else if (this.state.result === 'processing') {
      console.log(this.pictureOrientation);
      return (
        <View style={styles.container}>
          <Image
            style={this.pictureOrientation === 0 ? styles.imageRotate : styles.image}
            source={{ uri: `data:image/png;base64,${this.picture}` }}
          />
          <Text style={{ color: 'blue', textAlign: 'center', margin: 5 }}>{this.state.status}</Text>
          <ActivityIndicator size="large" color="#708090" sytle={{ margin: 20 }} />
        </View>
      );
    } else if (this.state.result === 'finish analysis') {
      return (
        <Keyword
          imageRecognitionResult={this.analysisResult}
          getSearchText={this.getSearchText}
        />
      );
    }
    return (
      <Result
        products={this.products}
      />
    );
  }

  getSearchText = (someWords) => {
    this.callGetProduct(someWords);
    this.setState({ result: 'processing' });
  }

  callGetProduct = async (searchKeywords) => {
    try {
      this.setState({ status: 'Getting the data from Amazon...' });
      this.wrappedGetProductPromise = cancelPromise(getProductAmazon(searchKeywords));

      this.products = await this.wrappedGetProductPromise.promise;

      this.setState({ result: 'success' });
    } catch (error) {
      console.warn('amazonError', error);

      if (this.retryCounter >= 2) {
        this.makeModalAlert(this.GOHOMEMESSAGE, this.goBackToCamera);
        return;
      }
      if (error.message === 'We did not find any matches for your request.') {
        this.setState({ result: 'finish analysis' });
        return;
      }
      this.retryCounter += 1;
      this.setState({ result: 'error' });
    }
  }

  callGetImageResultApi = async (url) => {
    try {
      this.setState({ status: 'Analyzing your image...' });

      this.wrappedGetProductPromise = cancelPromise(getResultFromApi(url, 5000, 1));
      this.analysisResult = await this.wrappedGetProductPromise.promise;

      this.setState({ result: 'finish analysis' });
    } catch (error) {
      console.warn(error);
      this.makeModalAlert(this.GOHOMEMESSAGE, this.goBackToCamera);
    }
  }

  callPostImageApi = async () => {
    try {
      this.setState({ status: 'Registering your image...' });

      this.wrappedPostImagePromise = cancelPromise(postImageApi(this.picture));
      const analysisUrl = await this.wrappedPostImagePromise.promise;
      this.callGetImageResultApi(analysisUrl);
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
    this.setState({ result: 'processing' });
    this.props.navigation.goBack();
  }


  render() {
    return this.currentView;
  }
}

WaitingScreen.propTypes = {
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
