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
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  bottomButtons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  defaultButton: {
    flex: 0,
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sendPictureToAnalyze: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const SelectedPhoto = ({ navigation }) => {
  const { params } = navigation.state;
  const { uri } = params;

  const convertImageBase64 = async () => {
    try {
      const convertedData = await RNFetchBlob.fs.readFile(uri, 'base64');

      navigation.navigate('Result', {
        picture: convertedData,
      });
      return;
    } catch (error) {
      console.error('ERROR shows: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
      <View style={styles.bottomButtons}>
        <View style={styles.defaultButton}>
          <TouchableHighlight
            onPress={() => convertImageBase64()}
            style={styles.sendPictureToAnalyze}
          >
            <Text style={{ fontSize: 14 }}>
              Analyze Picture
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SelectedPhoto;
