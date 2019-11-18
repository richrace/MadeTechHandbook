import React from 'react';
import {View, Text} from 'react-native';
import {Linking} from 'react-native';
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

    for (var i = 0; i < results.length; i++) {
      results[i] =
        'https://raw.githubusercontent.com' + results[i].replace('blob/', '');
    }

    return results;
  };

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const parsedArray = this.parseLinks(rawHtml);
    const result = parsedArray.slice(3);

    this.setState({text: result});

    console.log(result);
  }

  render = () => {
    return (
      <View>
        <Text
          style={{
            color: 'green',
            fontSize: 20,
            paddingRight: 100,
            paddingLeft: 180,
          }}
          onPress={() => Linking.openURL(this.state.text[0])}>
          Google
        </Text>
      </View>
    );
  };
}

export {Content};
