import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import History from './History';
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
    History: {
      screen: History,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
