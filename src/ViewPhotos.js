import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  image: {
    width: 110,
    height: 120,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797',
  },
});

export default class ViewPhotos extends Component {
  static navigationOptions = {
    title: 'Select one photo',
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      photos: params.photos,
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  renderRow(rowData) {
    const { uri } = rowData.node.image;

    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('SelectedPhoto', {
          uri,
          navigation: this.props.navigation,
        })}
      >
        <Image
          source={{ uri: rowData.node.image.uri }}
          style={styles.image}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.data.cloneWithRows(this.state.photos)}
          renderRow={rowData => this.renderRow(rowData)}
        />
      </View>
    );
  }
}

ViewPhotos.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
    getParam: PropTypes.func,
    goBack: PropTypes.func,
    isFocused: PropTypes.func,
    navigate: PropTypes.func,
    pop: PropTypes.func,
    popToTop: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      params: PropTypes.shape({
        photos: PropTypes.arrayOf(PropTypes.shape({
          node: PropTypes.shape({
            group_name: PropTypes.string,
            image: PropTypes.shape({
              height: PropTypes.number,
              uri: PropTypes.string,
              width: PropTypes.number,
            }),
            timestamp: PropTypes.number,
            type: PropTypes.string,
          }),
        })),
      }),
      routeName: PropTypes.string,
    }),
  }).isRequired,
};
