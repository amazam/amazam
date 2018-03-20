import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Linking,
} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ResultButton from './ResultButton';

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 20,
  },
  priceContentStyle: {
    justifyContent: 'center',
    flex: 2,
    marginRight: 10,
  },
  priceTextStyle: {
    fontSize: 20,
    textAlign: 'right',
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

const ResultDetail = ({ product }) => (
  <Card>
    <CardSection>
      <View style={styles.thumbnailContainerStyle}>
        <Image
          style={styles.thumbnailStyle}
          source={{ uri: product.SmallImage !== undefined ? product.SmallImage[0].URL[0] : 'http://howmadareyou.com/wp-content/themes/MAD/images/default_thumbnail.jpg' }}
        />
      </View>
      <View style={styles.headerContentStyle}>
        <Text style={styles.headerTextStyle}>
          {product.ItemAttributes[0].Brand !== undefined ? product.ItemAttributes[0].Brand[0] : 'Product'}
        </Text>
        <Text>
          {product.ItemAttributes[0].Binding !== undefined ? product.ItemAttributes[0].Binding[0] : 'Product Group'}
        </Text>
      </View>
      <View style={styles.priceContentStyle}>
        <Text style={styles.priceTextStyle}>
          {product.ItemAttributes[0].ListPrice !== undefined ? product.ItemAttributes[0].ListPrice[0].FormattedPrice : ''}
        </Text>
      </View>
    </CardSection>

    <CardSection>
      <Text>{JSON.stringify(product.ItemAttributes[0].Title[0])}</Text>
    </CardSection>

    <CardSection>
      <ResultButton onPress={() => Linking.openURL(product.DetailPageURL[0])}>
        Go to Amazon
      </ResultButton>
    </CardSection>
  </Card>
);

export default ResultDetail;
