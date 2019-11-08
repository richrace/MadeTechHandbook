import React from 'react';
import {View, Text} from 'react-native';

import styles from './ContentStyles/Content.style';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  fetchData = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/madetech/handbook/master/README.md',
    );
    return await response.text();
  };

  async componentDidMount() {
    const text = await this.fetchData();
    this.setState({text: text});
  }

  render = () => {
    return (
      <View>
        <Text style={{paddingRight: 15, paddingLeft: 15}}>
          {this.state.text}
        </Text>
      </View>
    );
  };
}

export {Content};
