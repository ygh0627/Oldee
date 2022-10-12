import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../screens/rootStack.screens';

function SignupCheckbox() {
  const [toggleUseAgree, setToggleUseAgree] = useState(false);
  const [togglePrivacyAgree, setTogglePrivacyAgree] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();
  const goTermsOfService = () => {
    navigation.navigate('이용약관');
  };
  return (
    <View>
      <AgreementWrapper>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={toggleUseAgree}
            onValueChange={newValue => setToggleUseAgree(newValue)}
            tintColors={{true: '#DF8D8D'}}
          />
          <TouchableWithoutFeedback
            onPress={() => setToggleUseAgree(prev => !prev)}>
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
            value={togglePrivacyAgree}
            onValueChange={newValue => setTogglePrivacyAgree(newValue)}
            tintColors={{true: '#DF8D8D'}}
          />
          <TouchableWithoutFeedback
            onPress={() => setTogglePrivacyAgree(prev => !prev)}>
            <Description>개인정보 처리방침 동의 (필수)</Description>
          </TouchableWithoutFeedback>
        </View>
        <ShowDetail>보기</ShowDetail>
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
