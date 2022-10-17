import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../screens/rootStack.screens';
import {inputProps} from '../screens/signUpScreen.screens';

interface SignupCheckboxProps {
  input: inputProps;
  onValueChange: (value: boolean) => (target: string) => void;
  onPress: (target: string) => void;
}

function SignupCheckbox({input, onValueChange, onPress}: SignupCheckboxProps) {
  const navigation = useNavigation<RootStackNavigationProp>();

  const goTermsOfService = () => {
    navigation.navigate('이용약관');
  };

  const goTermsOfPrivacy = () => {
    navigation.navigate('개인정보');
  };

  return (
    <View style={{flex: 1}}>
      <AgreementWrapper>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={Boolean(input.userPolicyYn)}
            onValueChange={newValue => onValueChange(newValue)('userPolicyYn')}
            tintColors={{true: '#DF8D8D'}}
          />
          <TouchableWithoutFeedback onPress={() => onPress('userPolicyYn')}>
            <Description>서비스 이용약관 (필수)</Description>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={goTermsOfService}>
          <ShowDetail>보기</ShowDetail>
        </TouchableWithoutFeedback>
      </AgreementWrapper>
      <AgreementWrapper>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={Boolean(input.userAlertYn)}
            onValueChange={newValue => onValueChange(newValue)('userAlertYn')}
            tintColors={{true: '#DF8D8D'}}
          />
          <TouchableWithoutFeedback onPress={() => onPress('userAlertYn')}>
            <Description>개인정보 처리방침 동의 (필수)</Description>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={goTermsOfPrivacy}>
          <ShowDetail>보기</ShowDetail>
        </TouchableWithoutFeedback>
      </AgreementWrapper>
    </View>
  );
}
const AgreementWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Description = styled.Text`
  font-weight: 500;
  font-size: ${wp(16)}px;
  color: #101010;
`;
const ShowDetail = styled.Text`
  color: #90b7de;
  font-weight: 500;
  font-size: ${wp(16)}px;
  line-height: 20px;
`;
export default SignupCheckbox;
