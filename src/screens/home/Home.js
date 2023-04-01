import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import Header1 from '../../components/Headers/header1-component';
import CustomGradientWidget from '../../components/UI/custom-gradient';
import Slider from '../../components/Sliders/slider';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  return (
    <CustomGradientWidget
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ScrollView>
      <Header1></Header1>
      <Slider></Slider>
      <Text>Trending Product</Text>
      <Slider></Slider>
      </ScrollView>
    </CustomGradientWidget>
    
  );
};

export default Home;

const styles = StyleSheet.create({});
