import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import usePermissionCheck from '../hooks/usePermissionCheck.hooks';
import Modal from 'react-native-modal';
import CameraAuthModal from '../components/cameraAuthModal.components';

function FirstScreen() {
  const [allChecked, platform] = usePermissionCheck();
  const [modalVisible, setModalVisible] = useState(false);

  const makeModalInvisible = () => {
    setModalVisible(false);
  };
  // 권한 검사 하여 모달창 띄울지 말지
  useEffect(() => {
    if (allChecked) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }, [allChecked]);

  return (
    <Safe>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={makeModalInvisible}
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}>
        <CameraAuthModal
          makeModalInvisible={makeModalInvisible}
          platform={platform}
        />
      </Modal>
    </Safe>
  );
}

const Safe = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default FirstScreen;
