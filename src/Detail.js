import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

const Detail = ({ navigation }) => {
  const { params } = navigation.state;
  const picture = params ? params.picture : 'Failure';

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>picture: {JSON.stringify(picture)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Detail;
