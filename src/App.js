import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import ViewPhotos from './ViewPhotos';
import SelectedPhoto from './SelectedPhoto';
import WaitingScreen from './Waiting';

const RootStack = StackNavigator(
  {
    Home: {
      screen: CameraScreen,
    },
    Waiting: {
      screen: WaitingScreen,
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
