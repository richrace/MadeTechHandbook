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

  parseLinks = (data) => {
    var result = data.match(/<a[^>]*href="([^"]*)"/g);
    console.log(result);
    
    for (var key in data) {
      return(result[key]);
    }
  };

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const result = this.parseLinks(rawHtml)
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
