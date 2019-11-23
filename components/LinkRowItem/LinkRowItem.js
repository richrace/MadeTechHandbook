import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';

class LinkRowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onPressButton = url => {
    fullUrl =
      'https://raw.githubusercontent.com/madetech/handbook/master/' + url;
    console.log(fullUrl);
    return fullUrl;
  };

  render = () => {
    const link = this.props.link;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this._onPressButton(link.item)}
          key={link.index}>
          <Modal
            animationType="slide"
            id={link.index}
            visible={this.state.modalVisible}>
            <View style={{marginTop: 100}}>
              <View>
                <Text>{link.item}</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>{link.item}</Text>
          </TouchableHighlight>
        </TouchableOpacity>
      </View>
    );
  };
}

export {LinkRowItem};
