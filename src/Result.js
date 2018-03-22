import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
} from 'react-native';

import ResultDetail from './ResultDetail';

const ResultScreen = ({ products }) => (
  <View style={{ flex: 1 }}>
    <ScrollView>
      {products.map(product =>
        <ResultDetail key={product.ASIN} product={product} />)}
    </ScrollView>
  </View>
);

ResultScreen.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
