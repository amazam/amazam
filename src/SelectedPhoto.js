import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 200,
  },
  sendPictureToAnalyze: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 20,
  },
});

const SelectedPhoto = ({ uri, navigation }) => {
  const convertImageBase64 = async () => {
    try {
      const convertedData = await RNFetchBlob.fs.readFile(uri, 'base64');
      console.log('convertedData shows: ', convertedData);

      navigation.navigate('Result', {
        picture: convertedData,
      });
    } catch (error) {
      console.error('ERROR shows: ', error);
      return error;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
      <TouchableHighlight
        onPress={() => convertImageBase64()}
        style={styles.sendPictureToAnalyze}
      >
        <Text style={{ fontSize: 14, color: 'white' }}> Analyze Picture </Text>
      </TouchableHighlight>
    </View>
  );
};

export default SelectedPhoto;
