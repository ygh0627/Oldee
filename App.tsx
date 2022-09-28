import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import CameraAuthModal from './components/cameraAuthModal.components';
import Modal from 'react-native-modal';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <Safe>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}>
        <CameraAuthModal setModalVisible={setModalVisible} />
      </Modal>
    </Safe>
  );
}

const Safe = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export default App;
