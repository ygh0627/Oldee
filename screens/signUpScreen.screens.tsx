import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignupCheckbox from '../components/signupCheckbox.components';
import SignupTextInputs from '../components/signupTextInputs.components';
import {wp} from '../utils/wp';
import {RootStackParamList} from './rootStack.screens';

type SignupScreenRouteProp = RouteProp<RootStackParamList, '회원가입'>;

function SignUpScreen() {
  const {params} = useRoute<SignupScreenRouteProp>();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, paddingHorizontal: wp(24)}}>
        <SignupTextInputs email={params.email} phone={params.phone} />
        <SignupCheckbox />
        <SignupSubmitBtn>
          <SignupText>Oldee 시작하기</SignupText>
        </SignupSubmitBtn>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const SignupSubmitBtn = styled.Pressable`
  padding: ${wp(14)}px ${wp(115)}px;
  background: #90b7de;
  border-radius: 8px;
  margin-top: ${wp(34)}px;
`;
const SignupText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;
export default SignUpScreen;

// const getUserProfile = async () => {
//   const profileResult = await getProfile(naverToken.accessToken);
//   if (profileResult.resultcode === '024') {
//     Alert.alert('로그인 실패', profileResult.message);
//     return;
//   }
//   console.log('profileResult', profileResult);
// };
