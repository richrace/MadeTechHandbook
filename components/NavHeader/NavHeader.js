import React from 'react';
import { Text, Image } from 'react-native';

import styles from './NavHeaderStyles/NavHeader.style';


class NavHeader extends React.Component {
  render = () => {
    return (
      // <Text style={styles.text}>
      //   {this.props.header}
        <Image
          style={styles.image}
          source={require('../../images/made-tech-logo-colour-fe96d680ccf157972a92723cc5266af6.png')}
        />
      // </Text>
  
    )
  }
}

export { NavHeader };