import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import usePermissionCheck from '../hooks/usePermissionCheck.hooks';
import Modal from 'react-native-modal';
import CameraAuthModal from '../components/cameraAuthModal.components';

function FirstScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [allChecked, platform] = usePermissionCheck();

  const makeModalInvisible = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (allChecked) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }, [allChecked]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

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
