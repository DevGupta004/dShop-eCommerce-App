import React from 'react';
import {StyleSheet, Text, SafeAreaView, View, Touchable, TouchableOpacity} from 'react-native';
import CustomGradientWidget from '../../components/UI/custom-gradient';
import NativeStorageUtility from '../../utilities/NativeStorageUtility';
import { Image } from 'react-native';
import { Button } from 'react-native-elements';
import { ROUTES } from '../../constants';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      photo: '',
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();
  }

  render() {
    return (
      <CustomGradientWidget style={{
        // flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
      }}>
        <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Image style={{height: 100, width: 100}} source={{uri:this.state.photo}}></Image>
        <Text>Name: {this.state.name}</Text>
        <Text>Email: {this.state.email}</Text>

        <TouchableOpacity>
          <Button title={"Go To Home"} onPress={() => this.props.navigation.navigate(ROUTES.HOME)}></Button>
        </TouchableOpacity>
        </View>
      </CustomGradientWidget>
    );
  }

  getUserInfo = async () => {
    const userProfile = await NativeStorageUtility.getItem('user');
    const {name, email, photo}  = userProfile;
    this.setState({name, email, photo});
    console.log('userProfileuserProfile', userProfile);
  };
}

const styles = StyleSheet.create({});
