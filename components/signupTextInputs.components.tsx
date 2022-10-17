import React from 'react';
import styled from 'styled-components/native';
import {inputProps} from '../screens/signUpScreen.screens';
import {wp} from '../utils/wp';

const nicknameRegExp = /^[0-9a-zA-Z가-힣\x20]*$/gi;
const patternRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

interface SignupTextInputProps {
  input: inputProps;
  onChangeText: (text: string) => (target: string) => void;
}

function SignupTextInputs({input, onChangeText}: SignupTextInputProps) {
  const isNicknameRegPass =
    input.userName.match(nicknameRegExp) !== null && input.userName.length > 2;
  const isEmailRegPass = input.userEmail.match(patternRegExp) !== null;
  const isPhoneRegPass = input.userPhone.length > 9;
  return (
    <>
      <InputWrapper isFirst={true}>
        <Label>닉네임</Label>
        <Input
          isPass={isNicknameRegPass}
          isEmpty={input.userName.length === 0}
          placeholder="닉네임을 입력해주세요 (최대 10자)"
          value={input.userName}
          maxLength={10}
          onChangeText={text => {
            onChangeText(text)('userName');
          }}
        />
        {!isNicknameRegPass && input.userName.length > 0 && (
          <WarnMessage>특수문자를 제외한 3~20자를 입력해주세요</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <Input
          isPass={isEmailRegPass}
          isEmpty={input.userEmail.length === 0}
          placeholder="이메일을 입력해주세요"
          value={input.userEmail}
          onChangeText={text => onChangeText(text)('userEmail')}
        />
        {!isEmailRegPass && input.userEmail.length > 0 && (
          <WarnMessage>올바른 이메일 형식을 입력해주세요.</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper isLast={true}>
        <Label>휴대폰</Label>
        <Input
          isPass={isPhoneRegPass}
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
const Input = styled.TextInput<{isPass: boolean; isEmpty: boolean}>`
  font-weight: 500;
  font-size: ${wp(16)}px;
  padding: ${wp(12)}px ${wp(16)}px;
  border: 1px solid #dadada;
  border-color: ${({isPass, isEmpty}) =>
    isEmpty ? '#dadada' : isPass ? '#90B7DE' : 'red'};
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
