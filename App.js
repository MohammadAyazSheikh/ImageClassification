
import React, { useEffect } from 'react';

import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';

import { Camera, useCameraDevices } from 'react-native-vision-camera';




const App = () => {


  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {




    // (async () => {
    //   const cameraPermission = await Camera.requestCameraPermission()
    //   const microphonePermission = await Camera.requestMicrophonePermission();
    //   // alert(cameraPermission + microphonePermission)
    // })();

    // const checkCameraPermission = async () => {
    //   await Camera.requestCameraPermission();
    //   let status = await Camera.getCameraPermissionStatus();
    //   if (status !== 'authorized') {
    //     await Camera.requestCameraPermission();
    //     status = await Camera.getCameraPermissionStatus();
    //     if (status === 'denied') {
    //       alert(
    //         'You will not be able to scan if you do not allow camera access',
    //       );
    //     }
    //   }
    // };

    // checkCameraPermission();
    requestCameraPermission();

  }, [])

  return (
    device == null ?
      <View style={styles.container}>
        <ActivityIndicator
          size={'large'}
        />
      </View>
      :
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default App;

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You can use the camera");
    } else {
      alert("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};