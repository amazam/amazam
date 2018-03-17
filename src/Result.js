import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { CLOUDSIGHT } from 'react-native-dotenv';
import getResultAmazon from '../util/index';
import ResultDetail from './ResultDetail';

class ResultScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.getAnalysisUrl = params ? params.url : 'Failure';

    this.state = { products: [] };
  }

  async componentDidMount() {
    const analysisResult = await (await fetch(this.getAnalysisUrl, {
      method: 'GET',
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
      },
    })).json();

    const amazonResult = await getResultAmazon(analysisResult.name);
    this.setState({ products: amazonResult });

    console.log(amazonResult);
  }

  renderProducts() {
    return this.state.products.map(product =>
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
