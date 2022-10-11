import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import SignupTextInputs from '../components/signupTextInputs.components';
import {wp} from '../utils/wp';

function SignUpScreen() {
  SplashScreen.hide();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, paddingHorizontal: wp(24)}}>
        <SignupTextInputs />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;

// const getUserProfile = async () => {
//   const profileResult = await getProfile(naverToken.accessToken);
//   if (profileResult.resultcode === '024') {
//     Alert.alert('로그인 실패', profileResult.message);
//     return;
//   }
//   console.log('profileResult', profileResult);
// };
