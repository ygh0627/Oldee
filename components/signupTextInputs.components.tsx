import React, {useEffect, useMemo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {duplicateErrorProps, inputProps} from '../screens/signUpScreen.screens';
import {wp} from '../utils/wp';

const nicknameRegExp = /^[0-9a-zA-Z가-힣\x20]*$/gi;
const patternRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

interface SignupTextInputProps {
  input: inputProps;
  onChangeText: (text: string) => (target: string) => void;
  setAllValid: (condition: boolean) => void;
  duplicateError: duplicateErrorProps;
}

function SignupTextInputs({
  input,
  onChangeText,
  setAllValid,
  duplicateError,
}: SignupTextInputProps) {
  const isNicknameRegPass = useMemo(() => {
    return (
      input.userName.match(nicknameRegExp) !== null && input.userName.length > 2
    );
  }, [input.userName]);

  const isEmailRegPass = useMemo(() => {
    return input.userEmail.match(patternRegExp) !== null;
  }, [input.userEmail]);

  const isPhoneRegPass = useMemo(() => {
    return input.userPhone.length > 9;
  }, [input.userPhone]);

  const isEmailDuplicated = Boolean(duplicateError.emailError);
  const isNickNameDuplicated = Boolean(duplicateError.nicknameError);

  useEffect(() => {
    setAllValid(isNicknameRegPass && isEmailRegPass && isPhoneRegPass);
  }, [isNicknameRegPass, isEmailRegPass, isPhoneRegPass, setAllValid]);
  console.log(duplicateError);
  return (
    <>
      <InputWrapper isFirst={true}>
        <Label>닉네임</Label>
        <Input
          isRegPass={isNicknameRegPass}
          isDup={isNickNameDuplicated}
          isEmpty={input.userName.length === 0}
          placeholder="닉네임을 입력해주세요 (최대 10자)"
          value={input.userName}
          maxLength={10}
          onChangeText={text => {
            onChangeText(text)('userName');
          }}
        />
        {!isNicknameRegPass && input.userName.length > 0 && (
          <View>
            <WarnMessage>특수문자를 제외한 3~20자를 입력해주세요</WarnMessage>
          </View>
        )}
        {Boolean(duplicateError.nicknameError) && (
          <WarnMessage>중복된 닉네임입니다</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <Input
          isRegPass={isEmailRegPass}
          isDup={isEmailDuplicated}
          isEmpty={input.userEmail.length === 0}
          placeholder="이메일을 입력해주세요"
          value={input.userEmail}
          onChangeText={text => onChangeText(text)('userEmail')}
        />
        {!isEmailRegPass && input.userEmail.length > 0 && (
          <WarnMessage>올바른 이메일 형식을 입력해주세요.</WarnMessage>
        )}
        {Boolean(duplicateError.emailError) && (
          <WarnMessage>중복된 이메일입니다.</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper isLast={true}>
        <Label>휴대폰</Label>
        <Input
          isRegPass={isPhoneRegPass}
          isEmpty={input.userPhone.length === 0}
          placeholder="사용하실 핸드폰번호를 입력해주세요"
          keyboardType="numeric"
          value={input.userPhone}
          maxLength={11}
          onChangeText={text => onChangeText(text)('userPhone')}
        />
      </InputWrapper>
    </>
  );
}
const InputWrapper = styled.View<{isLast?: boolean; isFirst?: boolean}>`
  margin-bottom: ${({isLast}) => (isLast ? `${wp(32)}px` : `${wp(23)}px`)};
  margin-top: ${({isFirst}) => (isFirst ? `${wp(20)}px` : '0px')};
`;
const Label = styled.Text`
  font-weight: 700;
  color: #101010;
  font-size: ${wp(20)}px;
  padding-bottom: ${wp(12)}px;
`;
const Input = styled.TextInput<{
  isRegPass: boolean;
  isEmpty: boolean;
  isDup?: boolean;
}>`
  font-weight: 500;
  font-size: ${wp(16)}px;
  padding: ${wp(12)}px ${wp(16)}px;
  border: 1px solid #dadada;
  border-color: ${({isRegPass, isEmpty, isDup}) =>
    isEmpty ? '#dadada' : isDup ? 'red' : isRegPass ? '#90B7DE' : 'red'};
  border-radius: ${wp(8)}px;
`;
const WarnMessage = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #df8d8d;
  margin-top: ${wp(9)}px;
`;

export default SignupTextInputs;
