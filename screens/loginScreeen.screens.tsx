import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import {
  NaverLogin,
  getProfile,
  TokenResponse,
} from '@react-native-seoul/naver-login';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import splashImg from '../assets/images/splashImg.jpg';
import naverLogin from '../assets/images/naverLogin.jpg';
import appleLogin from '../assets/images/appleLogin.jpg';
import {wp} from '../utils/wp';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
  console.log(naverToken);
  const naverLoginFn = (props: naverKeyType) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  return (
    <View style={{flex: 1}}>
      <Background source={splashImg} resizeMode="cover" />
      <LoginBoxWrapper>
        <Pressable onPress={() => naverLoginFn(naverAndroidKey)}>
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
