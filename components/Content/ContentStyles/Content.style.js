import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: '50%'
  },
  searchBar: {
    backgroundColor: '#42ab3a',
    height: 50,
    fontSize: 20,
    padding: 10,
    color: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#42ab3a'
  }
});
