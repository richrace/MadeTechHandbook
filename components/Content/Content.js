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
      'https://github.com/madetech/handbook/blob/master/README.md',
    );
    return await response.text();
  };

  parseLinks = data => {
    var results = [
      ...data.matchAll(new RegExp('<a href="(/madetech[^"]*?)"', 'g')),
    ].map(str => str[1]);

    return results;
  };

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const result = this.parseLinks(rawHtml);
    this.setState({text: result});
  }

  render = () => {
    return (
      <View>
        <Text style={{paddingRight: 20, paddingLeft: 20}}>
          {this.state.text}
        </Text>
      </View>
    );
  };
}

export {Content};
