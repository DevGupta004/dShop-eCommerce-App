import {Platform, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {SocialIcon} from 'react-native-elements';
import React from 'react';
// import {EventRegister} from 'react-native-event-listeners';
import ROUTES from '../../../../constants/routes';
import {styles} from './google.auth.style';
import DataContextProvider from '../../../../data-context/contextProvider';
import NativeStorageUtility from '../../../../utilities/NativeStorageUtility';

export default class GoogleAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userDta: '',
      initializing: true,
      currentUser: ''
    };
  }

  componentDidMount = async () => {
    try {
      if (Platform.OS === 'ios') {
        await GoogleSignin.hasPlayServices();
      }
      this.isSignedIn();
      this.getCurrentUser();
    } catch (error) {
      console.error('error inside componentDidMount GoogleAuth\n', error);
    }
  };

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn) {
      this.props.navigation.navigate(ROUTES.HOME)
      this.setState({isSignedIn})
    }
    this.setState({ isLoginScreenPresented: !isSignedIn });
  };

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    // console.log("getCurrentUsergetCurrentUser",JSON.stringify(currentUser,0,2))
    this.setState({currentUser: currentUser.user})
    this.saveAuthDetails()
  };

 render() {
    return <View>{this.renderSocialIcon()}</View>;
  }

  renderSocialIcon = () => {
    const {iconText} = 'Sign In With Google';
    return (
      <SocialIcon
        title={'Sign In With Google'}
        iconStyle={styles.iconStyle}
        button
        type="google"
        onPress={() => this.onGoogleButtonPress()}
      />
    );
  };

  extraButtonStyle = () => {
    const shapes = [3, 6, 9, 10];
    const {buttonShape} = 1;
    const styles = {};
    if (shapes.includes(buttonShape)) {
      styles.borderRadius = 50;
    }
    return styles;
  };

  onGoogleButtonPress = async () => {
    console.log('while getting idToken\n');

    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log('while getting idToken\n', idToken);

    //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //   const userSignIn = await auth().signInWithCredential(googleCredential);
    //   const authentication = {idToken};
    //   const userData = await this.USER.verifySocialAuth('google', {
    //     ...userSignIn.additionalUserInfo.profile,
    //     authentication,
    //     id: userSignIn.additionalUserInfo.profile.sub,
    //   });
    // //   this.saveAuthDetails(userData);
    //   EventRegister.emit(loginEventEmitConfig.LOGIN);
    //   this.conditionalNagivation();
    } catch (error) {
    }
  };

  conditionalNagivation() {
    try {
    const { navigate } = this.props.navigation;
    const {home} = this.context.themeConfig?.screens
    if(home) {
      navigate(ROUTES.HOME, {
        socialAuth: true,
      });
    }else {
      navigate(ROUTES.MORE, {
        socialAuth: true,
      });
    }
    }catch (error) {
      throw error;
    }
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null});
    } catch (error) {
      console.error(error);
    }
  };

  saveAuthDetails = async () => {
    try {
      await NativeStorageUtility.setItem('user', this.state.currentUser);
      const user = await NativeStorageUtility.getItem('user');
    } catch (error) {
      console.error(error);
    }
  };
}


export const loginEventEmitConfig = {LOGIN: 'LOGIN', LOGOUT: 'LOGOUT'};

// GoogleAuthComponent.contextType = DataContextProvider;
