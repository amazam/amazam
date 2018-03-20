import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import ResultScreen from './Result';
import ViewPhotos from './ViewPhotos';
import SelectedPhoto from './SelectedPhoto';

const RootStack = StackNavigator(
  {
    Home: {
      screen: CameraScreen,
    },
    Result: {
      screen: ResultScreen,
    },
    CameraRoll: {
      screen: ViewPhotos,
    },
    SelectedPhoto: {
      screen: SelectedPhoto,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
