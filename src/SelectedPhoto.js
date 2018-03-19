import RNFetchBlob from 'react-native-fetch-blob';
import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

// analyzeImage = async () => {
//   const options = { quality: 0.6, base64: true };
//   const data = uri;
//   this.props.navigation.navigate('Detail', {
//     picture: data.base64,
//   });
// };


const SelectedPhoto = (props) => {
  // uri is a shown as {uri: "content://media/external/images/media/18"}
  const { uri, navigation } = props;
  const data = { uri };
  const dataToBase64 = RNFetchBlob.fs.readFile(RNFetchBlob.wrap(uri), 'base64')
    .then((newData) => {
      console.log('newData shows: ', newData);
      return newData;
    })
    .catch((err) => {
      console.log('ERROR shows: ', err);
      return err;
    });
  console.log('select photo props', props, dataToBase64);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
      <TouchableHighlight
        onPress={() => {
          console.log('send picture to image recognition API', data);
          navigation.navigate('Detail', {
            picture: dataToBase64,
          });
        }}
        style={styles.sendPictureToAnalyze}
      >
        <Text style={{ fontSize: 14, color: 'white' }}> Analyze Picture </Text>
      </TouchableHighlight>
    </View>
  );
};

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

export default SelectedPhoto;
