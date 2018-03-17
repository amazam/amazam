import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
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

    console.log('########## AMAZON RESULT- START ##########');
    console.log(amazonResult);
  }

  renderProducts() {
    console.log(this.state.products);
    return this.state.products.map(product =>
      // <Text key={product.ASIN[0]}>{product.ItemAttributes[0].Title[0]}</Text>
      <ResultDetail key={product.ASIN} product={product} />
    );
  }

  render() {
    return (
      <View>
        {/* <FlatList
          data={this.state.item.map(eachItem => ({ key: eachItem.ItemAttributes[0].Title[0] }))}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        /> */}
        {this.renderProducts()}
      </View>
    );
  }
}

export default ResultScreen;
