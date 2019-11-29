import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
} from 'react-native';

import styles from './LinkRowItemStyles/LinkRowItem.style';
import Markdown from 'react-native-markdown-renderer';

class LinkRowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false, markdownData: ''};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  fetchUrlData = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/madetech/handbook/master/' +
        this.props.link.item,
    );
    return await response.text();
  };

  async componentDidMount() {
    const markDownData = await this.fetchUrlData();

    this.setState({
      markdownData: markDownData,
    });
  }

  render = () => {
    const link = this.props.link;
    return (
      <View>
        <TouchableOpacity key={link.index}>
          <Modal
            animationType="slide"
            id={link.index}
            visible={this.state.modalVisible}>
            <View style={{marginTop: 100}}>
              <View>
                <ScrollView>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Go Back</Text>
                  </TouchableHighlight>

                  <Markdown>{this.state.markdownData}</Markdown>
                </ScrollView>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.link_style}>{link.item}</Text>
          </TouchableHighlight>
        </TouchableOpacity>
      </View>
    );
  };
}

export {LinkRowItem};
