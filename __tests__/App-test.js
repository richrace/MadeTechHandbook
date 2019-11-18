import 'react-native';
import React from 'react';
import App from '../App';
import {shallow} from 'enzyme';

import renderer from 'react-test-renderer';
import {Content} from '../components/Content/Content';
import {NavHeader} from '../components/NavHeader/NavHeader';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('renders the Content componenet correctly', () => {
  const content_comp = renderer.create(<Content />).toJSON();
  expect(content_comp).toMatchSnapshot();
});

it('renders the Content componenet correctly', () => {
  const nav_header_comp = renderer.create(<NavHeader />).toJSON();
  expect(nav_header_comp).toMatchSnapshot();
});

it('should call the fetchData and parseLinks method on the content component', () => {
  let contentComp = renderer.create(<Content />).getInstance();
  contentComp.fetchData();
  contentComp.parseLinks(
    'a long long long list of links that need to be parsed',
  );
});
