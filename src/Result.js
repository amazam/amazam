import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import ResultDetail from './ResultDetail';

class ResultScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.products = params ? params.products : 'Failure';
  }

  renderProducts() {
    return this.products.map(product =>
      <ResultDetail key={product.ASIN} product={product} />);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderProducts()}
        </ScrollView>
      </View>
    );
  }
}

export default ResultScreen;
