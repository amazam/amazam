import React from 'react';
import { StackNavigator } from 'react-navigation';
import Camera from './Camera';
import Detail from './Detail';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Camera,
    },
    Details: {
      screen: Detail,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
