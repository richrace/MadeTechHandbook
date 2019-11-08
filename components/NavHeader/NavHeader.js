import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

import styles from './NavHeaderStyles/NavHeader.style';

const madeTechLogo = require('../../images/made-tech-logo-colour-fe96d680ccf157972a92723cc5266af6.png');

class NavHeader extends React.Component {
  render = () => {
    return (
      <TouchableOpacity style={styles.image} activeOpacity={0.5}>
        <Image source={madeTechLogo} style={styles.image} />
      </TouchableOpacity>
    );
  };
}

export {NavHeader};
