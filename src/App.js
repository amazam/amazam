import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import DetailScreen from './Detail';
import ResultScreen from './Result';

const RootStack = StackNavigator(
  {
    Home: {
      screen: CameraScreen,
    },
    Detail: {
      screen: DetailScreen,
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
