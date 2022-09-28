import React, {useState} from 'react';
import styled from 'styled-components/native';
import CameraAuthModal from './components/cameraAuthModal.components';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Safe>
      <CameraAuthModal />
    </Safe>
  );
}
const Safe = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;
export default App;
