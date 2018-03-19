import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import ResultDetail from './ResultDetail';
import { AMAZON_ACCESS_KEY, AMAZON_ASSOCIATE_ID, AMAZON_SECRET_KEY } from 'react-native-dotenv';

const amazon = require('../util/amazon-product-api');

class ResultScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    this.getAnalysisUrl = params ? params.url : 'Failure';

    this.state = { products: [] };
  }

  async componentDidMount() {
    const client = amazon.createClient({
      awsId: AMAZON_ACCESS_KEY,
      awsSecret: AMAZON_SECRET_KEY,
      awsTag: AMAZON_ASSOCIATE_ID,
    });

    axios.get(this.getAnalysisUrl)
      .then((imageResult) => {
        console.log(imageResult);

        client.itemSearch({
          keywords: imageResult.data.name,
          itemPage: '1',
          responseGroup: 'ItemAttributes, Images',
        })
          .then((amazonResult) => {
            this.setState({ products: amazonResult });
            console.log(amazonResult);
          })
          .catch((amazonError) => {
            console.log(amazonError);
          });
      })
      .catch(imageError => console.log(imageError));
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
