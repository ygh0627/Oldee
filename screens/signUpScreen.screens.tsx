import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import SignupCheckbox from '../components/signupCheckbox.components';
import SignupTextInputs from '../components/signupTextInputs.components';
import api from '../utils/api.utils';
import {wp} from '../utils/wp';
import {RootStackParamList} from './rootStack.screens';
import Modal from 'react-native-modal';
import WelcomeModal from '../components/welcomeModal.components';

type SignupScreenRouteProp = RouteProp<RootStackParamList, '회원가입'>;

export interface inputProps {
  userSnsId: string;
  userPhone: string;
  userEmail: string;
  userName: string;
  userOsType: string;
  userAlertYn: number;
  userPolicyYn: number;
  userMarketingYn: number;
  userSnsType: string;
  [key: string]: string | Number;
}

export interface duplicateErrorProps {
  emailError: string;
  nicknameError: string;
}
function SignUpScreen() {
  const {params} = useRoute<SignupScreenRouteProp>();
  const [requestStart, setRequestStart] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [duplicateError, setDuplicateError] = useState<duplicateErrorProps>({
    emailError: '',
    nicknameError: '',
  });
  const [input, setInput] = useState<inputProps>({
    userSnsId: params.userSnsId ?? '',
    userPhone: params.phone ?? '',
    userEmail: params.email ?? '',
    userName: '',
    userOsType: 'android',
    userAlertYn: 0,
    userPolicyYn: 0,
    userMarketingYn: 1,
    userSnsType: params.userSnsType ?? '',
  });

  const isAllFilled = useMemo(() => {
    return Object.keys(input).every(el => input[el]);
  }, [input]);

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

  const setAllValid = useCallback((condition: boolean) => {
    if (condition) setIsAllValid(true);
    else setIsAllValid(false);
  }, []);

  const onPressJoin = () => {
    setRequestStart(true);
    setDuplicateError(prev => {
      return {...prev, emailError: '', nicknameError: ''};
    });
  };

  const makeModalInvisible = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (requestStart) {
      const request = async () => {
        try {
          const result = await api.post('api/v1/join/user', input, {
            headers: {
              Authorization: 'clo',
            },
          });
          if (result.data.data === 'Join Success') {
            setModalVisible(true);
          }
          if (result?.data?.errorMessage?.includes(input.userEmail)) {
            setDuplicateError(prev => {
              return {...prev, emailError: '중복된 이메일입니다.'};
            });
            setRequestStart(false);
          } else if (result?.data?.errorMessage?.includes(input.userName)) {
            setDuplicateError(prev => {
              return {...prev, nicknameError: '중복된 닉네임입니다.'};
            });
            setRequestStart(false);
          }
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      };
      request();
    }
  }, [requestStart]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, paddingHorizontal: wp(24)}}>
        <SignupTextInputs
          input={input}
          onChangeText={onChangeText}
          setAllValid={setAllValid}
          duplicateError={duplicateError}
        />
        <SignupCheckbox
          input={input}
          onValueChange={onValueChange}
          onPress={onPress}
        />
        <SignupSubmitBtn
          disabled={!isAllFilled && !isAllValid}
          canSubmit={isAllFilled && isAllValid}
          onPress={onPressJoin}>
          <SignupText canSubmit={isAllFilled && isAllValid}>
            Oldee 시작하기
          </SignupText>
        </SignupSubmitBtn>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={makeModalInvisible}
          animationInTiming={700}
          animationOutTiming={700}
          backdropTransitionInTiming={700}
          backdropTransitionOutTiming={700}>
          <WelcomeModal makeModalInvisible={makeModalInvisible} />
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const SignupSubmitBtn = styled.Pressable<{canSubmit: boolean}>`
  padding: ${wp(14)}px ${wp(115)}px;
  background: ${({canSubmit}) => (canSubmit ? '#90b7de' : '#F3F3F3')};
  border-radius: 8px;
  margin-bottom: ${wp(10)}px;
`;
const SignupText = styled.Text<{canSubmit: boolean}>`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: ${({canSubmit}) => (canSubmit ? '#FFFFFF' : '#DADADA')};
`;
export default SignUpScreen;
