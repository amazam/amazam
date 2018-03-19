import React from 'react';
import {
  CameraRoll,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ViewPhotos from './ViewPhotos';

class CameraScreen extends React.Component {
  state = {
    showPhotoGallery: false,
    photoArray: []
  }

  static navigationOptions = {
    title: 'Take a picture of your product',
  };
  
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.6, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("camera.js data await shows: ", data);
      this.props.navigation.navigate('Detail', {
        picture: data.base64,
      });
    }
  };

  getPhotosFromGallery() {
    CameraRoll.getPhotos({ first: 100 })
      .then(res => {
        // return image paths from res.edges
        let photoArray = res.edges;
        this.setState({ showPhotoGallery: true, photoArray: photoArray })
      })
  }


  render() {
    if (this.state.showPhotoGallery) {
      return (
        <ViewPhotos
          photoArray={this.state.photoArray}
          navigation={this.props.navigation} />
      )
    }
    const { navigate } = this.props.navigation;
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
          style={styles.capture}>
          <Text style={{ fontSize: 14 }}> CameraRoll </Text>
        </TouchableHighlight>
        </View>
        </View>
      </View>
    );  
  }
};

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

export default CameraScreen;
