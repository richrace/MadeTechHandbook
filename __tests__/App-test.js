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

test('renders the Content componenet correctly', () => {
  const tree = renderer.create(<Content />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders the Content componenet correctly', () => {
  const tree = renderer.create(<NavHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Fetching the html from the madetech handbook', () => {
  it('fetches data from server when server returns a successful response', done => {
    const mockSuccessResponse = {html: 'html'};
    const mockPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      response: () => mockPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Content />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://github.com/madetech/handbook/blob/master/README.md',
    );

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        // need to set some state here
      });

      global.fetch.mockClear();
      done();
    });
  });
});
