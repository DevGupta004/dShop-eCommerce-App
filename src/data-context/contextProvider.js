import React from 'react';
import {View} from 'react-native';
import NativeStorageUtility from '../utilities/NativeStorageUtility';
import DataContext from './DataContext';

export class DataContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'null',
      isUserAuthorized: 'null',
    };
  }

  headerRef = React.createRef();


  componentDidMount = async() => {
    await this.getConfigData();
  }


  render() {
    const value = {...this.state, ...this};
    console.log("valuevaluevalue",value)
    return (
      <DataContext.Provider value={value}>
        {this.props.children}
      </DataContext.Provider>
    );
  }

  async getConfigData() {
    const userData = await NativeStorage.getItem('user')

    const state = {
        userData,
      };
    this.setState(state);
  }

  saveUser = async (user) => {
     await NativeStorageUtility.setItem(user);
  };

  setUser = async (user) => {
    this.setState({
      user: await NativeStorage.getItem('user'),
      isUserAuthorized: isUserAuthorized,
    });
  };
}


export default DataContextProvider;
