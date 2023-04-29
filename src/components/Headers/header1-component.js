import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {nativeStyles as styles} from './header1-component.style';
import {ROUTES} from '../../constants';

export default class Header1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserAuthorized: false,
    };
  }

  async componentDidMount() {
    console.log("component  navigation", this.props)

    const isUserAuthorized = true;
    this.setState({isUserAuthorized: true});
  }

  render() {
    const logoUri =
      'https://raw.githubusercontent.com/DevGupta004/dShop-eCommerce-App/master/icon1.png';
    const iconColor = 'red';

    return (
      <>
        <View style={[styles.headerContainer]}>
          {this.renderLogo(logoUri)}
          <View style={styles.chromeCastHeaderContainer}>
            {this.renderProfileIcon(iconColor)}
          </View>
        </View>
      </>
    );
  }

  renderLogo(logoUri) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(ROUTES.PACKAGES);
        }}>
        <Image style={[this.customStyleLogo()]} source={{uri: logoUri}} />
      </TouchableOpacity>
    );
  }

  customStyleLogo() {
    let customStyles = styles.logo;
    return customStyles;
  }

  renderProfileIcon(iconColor) {
    let profileIcon = null;
    if (this.state.isUserAuthorized) {
      profileIcon = (
        <View style={styles.mainRenderProfileIcon}>
          <TouchableOpacity>
            <FontAwesomeIcon
              name="search"
              size={25}
              color={iconColor}
              style={[styles.profileIcon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(ROUTES.PROFILE);
            }}>
            <FontAwesomeIcon
              name="user-o"
              size={25}
              color={iconColor}
              style={[styles.profileIcon]}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return profileIcon;
  }
}

// Header1.contextType = DataContext;
