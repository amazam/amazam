import React from 'react';
import PropTypes from 'prop-types';
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
    resizeMode: 'contain',
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

SelectedPhoto.navigationOptions = {
  title: 'This is your selected photo',
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
};

SelectedPhoto.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
    isFocused: PropTypes.func,
    navigate: PropTypes.func,
    pop: PropTypes.func,
    popToTop: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      params: PropTypes.shape({
        uri: PropTypes.string,
      }),
      routeName: PropTypes.string,
    }),
  }).isRequired,
};

export default SelectedPhoto;
