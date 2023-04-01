import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
const nativeStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  logo: {
    width: 65,
    height: 55,
    borderRadius: 10,
    backgroundColor:'white',
  },
  insideAppLogo: {
    width: 66.6,
    height: 53.3,
    borderRadius: 10,
    marginLeft: 15,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chromeCast: {
    fontSize: 20,
  },
  profileIcon: {
    paddingLeft: (width * 4) / 100,
    paddingRight: (width * 3) / 100,
  },
  mainRenderProfileIcon: {
    flexDirection: 'row',
    marginLeft: 5,
  },
});


const webStyles = StyleSheet.create({
  
});

export {nativeStyles, webStyles};
