import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignupCheckbox from '../components/signupCheckbox.components';
import SignupTextInputs from '../components/signupTextInputs.components';
import {wp} from '../utils/wp';
import {RootStackParamList} from './rootStack.screens';

type SignupScreenRouteProp = RouteProp<RootStackParamList, '회원가입'>;

export interface inputProps {
  userSnsId: string;
  userPhone: string;
  userEmail: string;
  userName: string;
  userOSType: string;
  userAlertYn: number;
  userPolicyYn: number;
  userMarketingYn: number;
  userSnsType: string;
  [key: string]: string | Number;
}
function SignUpScreen() {
  const {params} = useRoute<SignupScreenRouteProp>();
  const [input, setInput] = useState<inputProps>({
    userSnsId: params.userSnsId ?? '',
    userPhone: params.phone ?? '',
    userEmail: params.email ?? '',
    userName: '',
    userOSType: 'android',
    userAlertYn: 0,
    userPolicyYn: 0,
    userMarketingYn: 1,
    userSnsType: params.userSnsType ?? '',
  });
  console.log(input);
  const onChangeText = (text: string) => {
    return (target: string) => {
      setInput(prev => {
        return {...prev, [target]: text};
      });
    };
  };

  const onValueChange = (newValue: boolean) => {
    return (target: string) => {
      setInput(prev => {
        return {...prev, [target]: Number(newValue)};
      });
    };
  };

  const onPress = (target: string) => {
    setInput(prev => {
      return {...prev, [target]: Number(!prev[target])};
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, paddingHorizontal: wp(24)}}>
        <SignupTextInputs input={input} onChangeText={onChangeText} />
        <SignupCheckbox
          input={input}
          onValueChange={onValueChange}
          onPress={onPress}
        />
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
  margin-bottom: ${wp(10)}px;
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
