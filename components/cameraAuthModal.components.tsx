import styled from 'styled-components/native';
import {wp} from '../utils/wp';
import React, {Dispatch, SetStateAction} from 'react';
import cameraImage from '../assets/images/icon_camera_round.png';
import galleryImage from '../assets/images/icon_gallery_round.png';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface CameraAuthModalProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const askPermission = async () => {
  try {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) {
      console.log('Good');
    }
  } catch (error) {
    console.log('askPermission', error);
  }
};

function CameraAuthModal({setModalVisible}: CameraAuthModalProps) {
  return (
    <Wrapper>
      <Header>접근 권한 안내</Header>
      <AccessWrapper>
        <CameraAccessWrapper>
          <Icon source={cameraImage} />
          <Option>카메라</Option>
          <Necessary>필수</Necessary>
        </CameraAccessWrapper>
        <GalleryAccessWrapper>
          <Icon source={galleryImage} />
          <Option>사진첩</Option>
          <Necessary>필수</Necessary>
        </GalleryAccessWrapper>
        <Separator />
        <Description>
          정보통신망법령에 따라 꼭 필요한 항목만 필수 접근 합니다.
        </Description>
        <ConfirmBtn
          onPress={() => {
            setModalVisible(false);
            askPermission();
          }}>
          <ConfirmText>확인</ConfirmText>
        </ConfirmBtn>
      </AccessWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: white;
  width: ${wp(325)}px;
  height: ${wp(424)}px;
  border-radius: 16px;
  align-items: center;
`;
const Header = styled.Text`
  color: black;
  font-weight: bold;
  margin-top: ${wp(35)}px;
  font-size: ${wp(20)}px;
  margin-bottom: ${wp(40)}px;
`;
const AccessWrapper = styled.View`
  width: 100%;
`;
const GalleryAccessWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: ${wp(35)}px;
`;
const CameraAccessWrapper = styled.View`
  flex-direction: row;
  padding-left: ${wp(35)}px;
  align-items: center;
  margin-bottom: ${wp(32)}px;
`;
const Necessary = styled.Text`
  font-size: ${wp(16)}px;
  color: #90b7de;
  font-weight: 500;
`;
const Option = styled(Necessary)`
  color: black;
  margin-right: 5px;
`;
const Icon = styled.Image`
  margin-right: ${wp(12)}px;
`;
const Separator = styled.View`
  height: 1px;
  background: #f5f5f5;
  margin-top: ${wp(32)}px;
`;
const Description = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #999999;
  margin-top: ${wp(12)}px;
  padding: 0px ${wp(24)}px;
`;
const ConfirmBtn = styled.Pressable`
  width: ${wp(277)}px;
  height: ${wp(48)}px;
  background: #90b7de;
  border-radius: ${wp(8)}px;
  margin: 0 auto;
  margin-top: ${wp(35)}px;
  align-items: center;
  justify-content: center;
`;

const ConfirmText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
`;
export default CameraAuthModal;
