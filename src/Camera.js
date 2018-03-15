import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles/styles';

const Camera = ({ navigation }) => {
  const takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      navigation.navigate('Details', {
        picture: data.base64,
      });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => { this.camera = ref; }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle="Permission to use camera"
        permissionDialogMessage="We need your permission to use your camera phone"
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={takePicture}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;
