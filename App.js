import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {firebase} from "./fire-base-config";
import DataContextProvider from './src/data-context/contextProvider';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    firebase
    const clientId = '1036894126755-h3ejj92cj6sir5orj977q7eq0g1oesgr.apps.googleusercontent.com';
      GoogleSignin.configure({webClientId: clientId});
    // isAuthenticated = is...
    return (
      <NavigationContainer>
        {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
        <AuthNavigator />
        <DataContextProvider></DataContextProvider>
      </NavigationContainer>
    );
  }
}
