import React from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';

import {LinkRowItem} from '../LinkRowItem/LinkRowItem';

import styles from './ContentStyles/Content.style';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: []};
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

  getTitle = links => {
    titles = links.map(link =>
      link.replace(
        'https://raw.githubusercontent.com/madetech/handbook/master/',
        '',
      ),
    );
    return titles;
  };

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const parsedArray = this.parseLinks(rawHtml);
    const links = parsedArray.slice(3);
    const linkTitiles = this.getTitle(links);

    this.setState({text: linkTitiles, inMemoryResults: linkTitiles});
  }

  searchHandbook = (value) => {
    const filteredResults = this.state.inMemoryResults.filter(
      item => {
        let itemLowercase = item.toLowerCase()
        let searchTermLowercase = value.toLowerCase()

        return itemLowercase.indexOf(searchTermLowercase) > -1
      }
    )
    this.setState({text: filteredResults});
  }

  render = () => {
    if (this.state.text) {
      return (
        <View>
          <TextInput
            placeholder="Search the handbook..."
            placeholderTextColor="#dddddd"
            onChangeText={value => this.searchHandbook(value)}
            lightTheme
            round
            style={{
              backgroundColor: '#2f363c',
              height: 50,
              fontSize: 20,
              padding: 10,
              color: 'white',
              borderBottomWidth: 0.5,
              borderBottomColor: '#7d90a0'
            }}
          />
          <FlatList
            data={this.state.text}
            keyExtractor={(index) => index.toString()}
            renderItem={link => <LinkRowItem link={link} />}
          />
        </View>
      );
    } else {
      return <Text style={styles.link_style}>Loading....</Text>;
    }
  };
}

export {Content};
