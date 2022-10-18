import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '../screens/rootStack.screens';
import {wp} from '../utils/wp';

function WelcomeModal({makeModalInvisible}: {makeModalInvisible: () => void}) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const goHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Wrapper>
        <Header>회원 가입 완료</Header>
        <Separator />
        <Description>회원가입이 완료되었습니다</Description>
        <ConfirmBtn onPress={goHome}>
          <ConfirmText>확인</ConfirmText>
        </ConfirmBtn>
      </Wrapper>
    </View>
  );
}

const Wrapper = styled.View`
  background-color: white;
  width: ${wp(225)}px;
  height: ${wp(224)}px;
  border-radius: 16px;
  align-items: center;
`;
const Header = styled.Text`
  color: black;
  font-weight: bold;
  margin-top: ${wp(35)}px;
  font-size: ${wp(20)}px;
  margin-bottom: ${wp(40)}px;
`;

const Separator = styled.View`
  height: 1px;
  background: #f5f5f5;
  margin-top: ${wp(32)}px;
`;

const Description = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #999999;
  margin-top: ${wp(12)}px;
  padding: 0px ${wp(24)}px;
`;

const ConfirmBtn = styled.Pressable`
  width: ${wp(225)}px;
  height: ${wp(48)}px;
  background: #90b7de;
  border-radius: ${wp(8)}px;
  margin: 0 auto;
  margin-top: ${wp(35)}px;
  align-items: center;
  justify-content: center;
`;

const ConfirmText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;

export default WelcomeModal;
