import {createContext, PropsWithChildren} from 'react';
import cameraAuthModalVisibleStore from './cameraAuthModalVisibleStore.store';
import React from 'react';
export const RootStore: any = createContext({
  cameraAuthModalVisible: new cameraAuthModalVisibleStore(),
});

function RootStoreProvider({children}: PropsWithChildren<unknown>) {
  return <RootStore.Provider value={RootStore}>{children}</RootStore.Provider>;
}

export default RootStoreProvider;
