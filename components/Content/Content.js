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

  openModal = link => {
    console.log(link);
    // Linking.openURL(link)
    // This will be called and will open a modal
    // Along with this it will fetch the data from the link provided to the method
    // This will then present the data fetched in the modal in markdown
    // Extract the raw markdown
    // Convert Markdown to something nicer
  };

  createMultipleComponents = component => {
    for (var i = 0; i < component.length; i++) {
      component[i] = (
        <Text
          style={styles.link_style}
          onPress={this.openModal(component[i])}>
          {component[i].replace(
            'https://raw.githubusercontent.com/madetech/handbook/master/',
            '',
          )}
          {'\n'}
        </Text>
      );
    }

    return component;
  };

  async componentDidMount() {
    const rawHtml = await this.fetchData();
    const parsedArray = this.parseLinks(rawHtml);
    const result = parsedArray.slice(3);
    const createMultipleComps = this.createMultipleComponents(result);

    this.setState({text: createMultipleComps});
  }

  render = () => {
    return <Text>{this.state.text}</Text>;
  };
}

export {Content};
