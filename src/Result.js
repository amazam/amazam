import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
} from 'react-native';

import ResultDetail from './ResultDetail';

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.state = {
      products: params ? params.productions : [],
    };
  }

  get currentView() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.products.map(product =>
            <ResultDetail key={product.ASIN} product={product} />)}
        </ScrollView>
      </View>
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
