
import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import {firebase} from '../../../../../fire-base-config';
import {SocialIcon} from 'react-native-elements';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {EventRegister} from 'react-native-event-listeners';
import ROUTES from '../../../../constants/routes';
import {styles} from './facebook-auth-component';


export default class FacebookAuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userData: '',
      initializing: true,
      loginInProgress: true,
    };
    this.USER = new SDKFactory().create('user');
  }
  componentDidMount = () => {
    firebase.auth().signOut();
    try {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({user});
        if (this.state.initializing) {
          this.setState({initializing: false});
        }
      });
    } catch (error) {
      console.error('error inside componentDidMount\n', error);
    }
  };
  
  render() {
    const {loginInProgress} = this.state
    let fbButton = <View>{this.renderSocialIcon()}</View>
    // if(loginInProgress) {
    //   fbButton = <Spinnerr visible={loginInProgress} ></Spinnerr>
    // }
    return fbButton;
  }

  renderSocialIcon = () => {
    const iconText = 'Sign In With Facebook';
    return (
      <SocialIcon
        style={[styles.socialIcon, this.extraButtonStyle()]}
        title={'Sign In With Facebook'}
        iconStyle={{marginHorizontal: 13, marginLeft: 18.9}}
        button
        type="facebook"
        onPress={() => this.signInWithFB()}
      />
    );
  };

  extraButtonStyle = () => {
    const shapes = [3, 6, 9, 10];
    const {buttonShape} = this.context.themeConfig;
    const styles = {};
    if (shapes.includes(buttonShape)) {
      styles.borderRadius = 50;
    }
    return styles;
  };

  signInWithFB = async () => {
    try {
      this.setState({loginInProgress: true});
      const fbCreds = await this.facebookCreds();
      console.log('Fb SignIn\n', fbCreds);

    //   const auth = getAuth();
    //   const response = await signInWithCredential(auth, fbCreds);
    //   const {email, uid} = response.user.providerData[0];
    //   const userData = await this.USER.verifySocialAuth('facebook', {
    //     email,
    //     token: fbCreds.accessToken,
    //     userId: uid,
    //   });
      this.loginUser(userData);
    } catch (error) {
      console.error('Fb SignIn Failed\n', error);
    }
  };
  facebookCreds = async () => {
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      ToastAndroid.show('Error in Login with Facebook', ToastAndroid.SHORT);
    }
    return FacebookAuthProvider.credential(data.accessToken);
  };

  loginUser = async userData => {
    ToastAndroid.show('Authentication successful!', ToastAndroid.SHORT);
    this.setState({loginInProgress: false});
    await this.saveAuthDetails(userData);
    EventRegister.emit(loginEventEmitConfig.LOGIN);
    this.conditionalNagivation();
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
      await firebase.auth().signOut();
    } catch (err) {
      console.error('Fb SignOut Failed\n', err);
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

// FacebookAuthComponent.contextType = DataContext;