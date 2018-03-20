import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
};

const CardSection = ({ children }) => (
  <View style={styles.containerStyle}>
    {children}
  </View>
);

export default CardSection;
