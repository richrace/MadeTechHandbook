import React from 'react';
import {View, FlatList, TextInput, ActivityIndicator} from 'react-native';

import {LinkRowItem} from '../LinkRowItem/LinkRowItem';

import styles from './ContentStyles/Content.style';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: [], loading: false};
  }

  fetchData = async () => {
    const response = await fetch(
      'https://github.com/madetech/handbook/blob/master/README.md',
    );
    return await response.text();
  };

  parseLinks = data => {
    var results = [
      ...data.matchAll(new RegExp('<a href="(/madetech[^"]*?.md)"', 'g')),
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


  linksAddedManually = () => {
    const addtionalUrls = [
      'https://raw.githubusercontent.com/madetech/handbook/master/company/about.md',
      'https://raw.githubusercontent.com/madetech/handbook/master/company/welcome_pack.md',
      'https://raw.githubusercontent.com/madetech/handbook/master/guides/welfare/expectation_health_check.md',

    ]
    return addtionalUrls
  }

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const parsedArray = this.parseLinks(rawHtml);
    const links = parsedArray.slice(3);
    const addtionalAddedUlrs = links.concat(this.linksAddedManually())

    const linkTitiles = this.getTitle(addtionalAddedUlrs);
    
    this.setState({
      text: linkTitiles,
      inMemoryResults: linkTitiles,
      loading: true,
    });
  }

  searchHandbook = value => {
    const filteredResults = this.state.inMemoryResults.filter(item => {
      let itemLowercase = item.toLowerCase();
      let searchTermLowercase = value.toLowerCase();

      return itemLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({text: filteredResults});
  };

  render = () => {
    if (this.state.loading) {
      return (
        <View>
          <TextInput
            placeholder="Search the handbook..."
            placeholderTextColor="#DCDCDC"
            autoCompleteType="off"
            autoCorrect="false"
            onChangeText={value => this.searchHandbook(value)}
            clearButtonMode="while-editing"
            lightTheme
            round
            style={styles.searchBar}
          />
          <FlatList style={{paddingBottom: '30%'}}
            data={this.state.text}
            keyExtractor={index => index.toString()}
            renderItem={link => <LinkRowItem link={link} />}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#42ab3a" />
        </View>
      );
    }
  };
}

export {Content};
