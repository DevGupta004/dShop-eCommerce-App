import {Platform, Text, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {SocialIcon} from 'react-native-elements';
import React from 'react';
// import {EventRegister} from 'react-native-event-listeners';
import ROUTES from '../../../../constants/routes';
import {styles} from './google.auth.style';

export default class GoogleAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userDta: '',
      initializing: true,
    };
    this.signOut();
  }

  componentDidMount = async () => {
    const clientId = '1036894126755-h3ejj92cj6sir5orj977q7eq0g1oesgr.apps.googleusercontent.com';
    try {
      if (Platform.OS === 'ios') {
        await GoogleSignin.hasPlayServices();
      }
      GoogleSignin.configure({webClientId: clientId});
      auth().onAuthStateChanged(user => {
        this.setState({user});
        if (this.state.initializing) {
          this.setState({initializing: false});
        }
      });
    } catch (error) {
      console.error('error inside componentDidMount GoogleAuth\n', error);
    }
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
    const { navigate } =this.props.navigation;
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

  saveAuthDetails = async user => {
    try {
      await User.saveAuthDetails(user);
      await this.context.getConfigData();
    } catch (error) {
      console.error(error);
    }
  };
}

export const loginEventEmitConfig = {LOGIN: 'LOGIN', LOGOUT: 'LOGOUT'};