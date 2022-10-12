import React, {useState} from 'react';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';

const nicknameRegExp = /^[0-9a-zA-Z가-힣\x20]*$/gi;
const patternRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function SignupTextInputs({
  email,
  phone,
}: Readonly<{
  email: string | undefined;
  phone: string | null | undefined;
}>) {
  const [input, setInput] = useState({
    nicknameInput: '',
    numberInput: '',
    emailInput: '',
  });
  const isNicknameRegPass =
    input.nicknameInput.match(nicknameRegExp) !== null &&
    input.nicknameInput.length > 3;
  const isEmailRegPass = input.emailInput.match(patternRegExp) !== null;
  const isPhoneRegPass = input.numberInput.length > 9;
  return (
    <>
      <InputWrapper>
        <Label>닉네임</Label>
        <Input
          isPass={isNicknameRegPass}
          isEmpty={input.nicknameInput.length === 0}
          placeholder="닉네임을 입력해주세요 (최대 10자)"
          value={input.nicknameInput}
          maxLength={10}
          onChangeText={text =>
            setInput(prev => {
              return {...prev, nicknameInput: text};
            })
          }
        />
        {!isNicknameRegPass && input.nicknameInput.length > 0 && (
          <WarnMessage>특수문자를 제외한 3~20자를 입력해주세요</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper>
        <Label>이메일</Label>
        <Input
          isPass={isEmailRegPass}
          defaultValue={email}
          isEmpty={input.emailInput.length === 0}
          placeholder="이메일을 입력해주세요"
          value={input.emailInput}
          onChangeText={text =>
            setInput(prev => {
              return {...prev, emailInput: text};
            })
          }
        />
        {!isEmailRegPass && input.emailInput.length > 0 && (
          <WarnMessage>올바른 이메일 형식을 입력해주세요.</WarnMessage>
        )}
      </InputWrapper>
      <InputWrapper isLast={true}>
        <Label>휴대폰</Label>
        <Input
          defaultValue={phone?.toString()}
          isPass={isPhoneRegPass}
          isEmpty={input.numberInput.length === 0}
          placeholder="사용하실 핸드폰번호를 입력해주세요"
          keyboardType="numeric"
          value={input.numberInput}
          maxLength={11}
          onChangeText={text =>
            setInput(prev => {
              return {...prev, numberInput: text};
            })
          }
        />
      </InputWrapper>
    </>
  );
}
const InputWrapper = styled.View<{isLast?: boolean}>`
  margin-bottom: ${({isLast}) => (isLast ? `${wp(48)}px` : `${wp(43)}px`)};
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
