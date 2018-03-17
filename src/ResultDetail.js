import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';

const ResultDetail = (props) => {
  return (
    <Card>
      <Text>{props.product.ItemAttributes[0].Title[0]}</Text>
    </Card>
  );
};

export default ResultDetail;
