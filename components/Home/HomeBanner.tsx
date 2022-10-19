import Swiper from 'react-native-swiper';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {wp} from '../../utils/wp';
import {ImageSourcePropType, View} from 'react-native';
const banner1: ImageSourcePropType = require('../../assets/images/bannerImage/Banner-01.jpg');
const banner2: ImageSourcePropType = require('../../assets/images/bannerImage/Banner-02.jpg');
const banner3: ImageSourcePropType = require('../../assets/images/bannerImage/Banner-03.jpg');
const banner4: ImageSourcePropType = require('../../assets/images/bannerImage/Banner-04.jpg');
const banners = [banner1, banner2, banner3, banner4];

function HomeBanner() {
  const [idx, setIdx] = useState(0);
  return (
    <BannerWrapper>
      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        removeClippedSubviews={false}
        key={banners.length}
        onIndexChanged={index => {
          setIdx(index + 1);
        }}
        showsPagination={false}>
        {banners.map(banner => (
          <BannerImage source={banner} key={banner.toString()} />
        ))}
      </Swiper>
      <Pagination>
        <Index>{`${idx}/${banners.length}`}</Index>
      </Pagination>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.View`
  height: ${wp(120)}px;
  width: ${wp(375)}px;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const Pagination = styled.View`
  width: ${wp(31)}px;
  height: ${wp(22)}px;
  border-radius: 4px;
  background: rgba(16, 16, 16, 0.4);
  position: absolute;
  right: ${wp(28)}px;
  top: ${wp(16)}px;
  align-items: center;
  justify-content: center;
`;
const Index = styled.Text`
  color: #ffffff;
  font-weight: 500;
`;

export default HomeBanner;
