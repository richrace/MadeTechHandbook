import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ScrollView,
  Button,
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

  normalizeTitle = title => {
    removeMD = title.replace(/.md/gi, '')
    return removeMD
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
              <View style={{marginTop: 100, marginLeft: 25, marginRight: 25, paddingBottom: '8%'}}>
                <TouchableHighlight
                style={styles.seperator}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                  <Text style={styles.back_button}> Back </Text>
                  </TouchableHighlight>
                <View>
                <ScrollView style={{paddingRight: 10, height: '100%'}}> 
                  <Markdown>{this.state.markdownData}</Markdown>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Button
            title={this.normalizeTitle(link.item)}
            color="green"
            onPress={() => {
              this.setModalVisible(true);
            }}>
          </Button>
        </TouchableOpacity>
      </View>
    );
  };
}

export {LinkRowItem};
