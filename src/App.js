import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import ResultScreen from './Result';

const RootStack = StackNavigator(
  {
    Home: {
      screen: CameraScreen,
    },
    Result: {
      screen: ResultScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
