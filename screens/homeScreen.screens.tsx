import React from 'react';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import Swiper from 'react-native-swiper';
const banner1 = require('../assets/images/bannerImage/Banner-01.jpg');
const banner2 = require('../assets/images/bannerImage/Banner-02.jpg');
const banner3 = require('../assets/images/bannerImage/Banner-03.jpg');
const banner4 = require('../assets/images/bannerImage/Banner-04.jpg');
function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        removeClippedSubviews={false}>
        <BannerImage source={banner1} />
        <BannerImage source={banner3} />
        <BannerImage source={banner2} />
        <BannerImage source={banner4} />
      </Swiper>
    </View>
  );
}

const BannerImage = styled.Image`
  height: ${wp(120)}px;
  width: ${wp(375)}px;
`;
export default HomeScreen;
