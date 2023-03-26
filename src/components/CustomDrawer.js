import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {COLORS, IMGS} from '../constants';

const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  return (
    <ScrollView {...props}>
      <ImageBackground source={IMGS.bgPattern} style={{height: 140}}>
        <Image source={IMGS.user} style={styles.userImg} />
      </ImageBackground>
      <View style={styles.drawerListWrapper}>
        {/* <DrawerItemList {...props} /> */}
      </View>
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 110,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: 'red',
  },
  drawerListWrapper: {
    marginTop: 65,
  },
});
