import React from 'react';
import { StackNavigator } from 'react-navigation';
import Camera from './Camera';
import Detail from './Detail';
import Result from './Result';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Camera,
    },
    Details: {
      screen: Detail,
    },
    Result: {
      screen: Result,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
