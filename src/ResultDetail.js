import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import ResultButton from './ResultButton';

const ResultDetail = ({ product }) => {
  return (
    <Card>
      <CardSection>
        <View style={styles.thumbnailContainerStyle}>
          <Image
            style={styles.thumbnailStyle}
            source={{ uri: product.SmallImage[0].URL[0] }}
          />
        </View>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{product.ItemAttributes[0].Brand[0]}</Text>
          <Text>
            {product.ItemAttributes[0].Binding[0]} | {product.ItemAttributes[0].ProductTypeName[0].toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </Text>
        </View>
      </CardSection>

      <CardSection>
        <Text>{product.ItemAttributes[0].Title[0]}</Text>
      </CardSection>

      <CardSection>
        <ResultButton onPress={() => Linking.openURL(product.DetailPageURL[0])}>
          Go to Amazon
        </ResultButton>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 20, 
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

export default ResultDetail;
