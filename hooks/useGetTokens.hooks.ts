import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

function useGetTokens() {
  const [tokens, setTokens] = useState({
    token: '',
    refreshToken: '',
  });
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (token !== null && refreshToken !== null) {
          setTokens(prev => {
            return {...prev, token, refreshToken};
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);

  return tokens;
}

export default useGetTokens;
