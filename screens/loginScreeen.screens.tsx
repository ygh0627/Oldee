import React, {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {NaverLogin, TokenResponse} from '@react-native-seoul/naver-login';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from './rootStack.screens';
import useSetLoginInfo from '../hooks/useSetLoginInfo.hooks';
import useUserCheck from '../hooks/useUserCheck.hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
const splashImg = require('../assets/images/splashImg.jpg');
const naverLogin = require('../assets/images/naverLogin.jpg');
const appleLogin = require('../assets/images/appleLogin.jpg');

interface naverKeyType {
  kConsumerKey: string;
  kConsumerSecret: string;
  kServiceAppName: string;
}
const naverAndroidKey = {
  kConsumerKey: 'G3Ip2_61nYwlMnC1BHXi',
  kConsumerSecret: '6FE4Sqlns9',
  kServiceAppName: 'OldeeRelease',
};

function LoginScreen() {
  SplashScreen.hide();
  const [naverToken, setNaverToken] = useState<TokenResponse | null>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const {loginInfo, phoneNumber} = useSetLoginInfo(naverToken);
  const checkResult = useUserCheck(loginInfo);
  const naverLoginFn = (props: naverKeyType) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const onPress = () => {
    naverLoginFn(naverAndroidKey);
  };

  useEffect(() => {
    const storeToken = async (token: string, refreshToken: string) => {
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('refreshToken', refreshToken);
      } catch (e) {
        console.log(e);
      }
    };
    if (checkResult?.data.errorMessage === 'No Match User') {
      navigation.navigate('회원가입', {
        phone: phoneNumber,
        email: loginInfo?.email,
        userSnsId: loginInfo?.userSnsId,
        userSnsType: loginInfo?.userSnsType,
      });
    } else if (checkResult?.data.message === 'success') {
      if (
        typeof loginInfo?.accessToken !== 'undefined' &&
        typeof loginInfo?.refreshToken !== 'undefined'
      ) {
        storeToken(loginInfo?.accessToken, loginInfo?.refreshToken);
      }

      navigation.navigate('Home');
    }
  }, [checkResult, navigation, loginInfo, phoneNumber]);
  return (
    <View style={{flex: 1}}>
      <Background source={splashImg} resizeMode="cover" />
      <LoginBoxWrapper>
        <Pressable onPress={onPress}>
          <Image source={naverLogin} style={{marginBottom: wp(12)}} />
        </Pressable>
        <Pressable>
          <Image source={appleLogin} />
        </Pressable>
      </LoginBoxWrapper>
    </View>
  );
}

const Background = styled.ImageBackground`
  flex: 1;
`;

const LoginBoxWrapper = styled.View`
  margin: 0 auto;
  bottom: ${wp(40)}px;
`;
export default LoginScreen;
