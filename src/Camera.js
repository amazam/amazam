import React from 'react';
import PropTypes from 'prop-types';
import {
  CameraRoll,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

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
  takepictureButton: {
    flex: 0,
    flexDirection: 'row',
  },
  cameraRollButton: {
    flex: 0,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    title: 'Take a picture of your product',
  };

  getPhotosFromGallery = () => {
    CameraRoll.getPhotos({ first: 100 })
      .then((res) => {
        // return image paths from res.edges
        const photoArray = res.edges;
        this.props.navigation.navigate('CameraRoll', { photos: photoArray });
      });
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.6, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.navigation.navigate('Result', {
        picture: data.base64,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => { this.camera = ref; }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <View style={styles.bottomButtons}>
          <View style={styles.takepictureButton}>
            <TouchableOpacity
              onPress={this.takePicture}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraRollButton}>
            <TouchableHighlight
              onPress={() => this.getPhotosFromGallery()}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}>
                CameraRoll
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

CameraScreen.propTypes = {
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
      routeName: PropTypes.string,
    }),
  }).isRequired,
};
