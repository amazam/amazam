import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import ResultScreen from './Result';
import ViewPhotos from './ViewPhotos';
import SelectedPhoto from './SelectedPhoto';
import KeywordSearch from './KeywordSearch';

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
    KeywordSearch: {
      screen: KeywordSearch,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
