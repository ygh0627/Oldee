import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import useGetTokens from '../hooks/useGetTokens.hooks';
import HomeBanner from '../components/Home/HomeBanner';
import useGetReformList from '../hooks/useGetReformList.hooks';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import ArrowSvg from '../assets/icons/arr_right.svg';

function HomeScreen() {
  const {token, refreshToken} = useGetTokens();
  const reformList = useGetReformList(token);

  return (
    <View>
      <HomeBanner />
      <SubWrapper style={{marginTop: wp(12)}}>
        <SubHeader>
          <BoldText>디자인 구경하기</BoldText>
          <ArrowSvg width={16} height={16} />
        </SubHeader>
      </SubWrapper>
    </View>
  );
}

const BoldText = styled.Text`
  font-weight: 700;
  color: #101010;
  font-size: ${wp(20)}px;
`;
const SubWrapper = styled.View`
  padding: ${wp(24)}px;
  background: #ffffff;
`;
const SubHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${wp(20)}px;
`;
export default HomeScreen;
