import React, { Component } from 'react';
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

class ViewPhotos extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      photos: params.photos,
      data: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      showSelectedPhoto: false,
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
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Pick a Photo </Text>
        </View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.data.cloneWithRows(this.state.photos)}
          renderRow={rowData => this.renderRow(rowData)}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

export default ViewPhotos;
