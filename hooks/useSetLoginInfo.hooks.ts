import {
  getProfile,
  GetProfileResponse,
  TokenResponse,
} from '@react-native-seoul/naver-login';
import {useEffect, useState, useMemo} from 'react';
import {Alert} from 'react-native';
import {timeConvert} from '../utils/timeConvert.utils';

export interface loginInfoType {
  accessToken?: string;
  refreshToken?: string;
  email?: string;
  userSnsId?: string;
  expireAt?: string;
}

function useSetLoginInfo(token?: TokenResponse | null) {
  const [userInfo, setUserInfo] = useState<GetProfileResponse>();
  const [loginInfo, setLoginInfo] = useState<loginInfoType>();
  const phoneNumber = useMemo(() => {
    return userInfo?.response.mobile;
  }, [userInfo]);

  useEffect(() => {
    if (token) {
      const getUserProfile = async () => {
        const profileResult = await getProfile(token.accessToken);
        if (profileResult.resultcode === '024') {
          Alert.alert('로그인 실패', profileResult.message);
          return;
        }
        setUserInfo(profileResult);
      };
      getUserProfile();

      setLoginInfo(prev => {
        return {
          ...prev,
          accessToken: token.accessToken,
          expireAt: timeConvert(Number(token.expiresAt)),
          refreshToken: token.refreshToken,
        };
      });
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setLoginInfo(prev => {
        return {
          ...prev,
          userSnsId: userInfo.response.id,
          email: userInfo.response.email,
        };
      });
    }
  }, [userInfo]);

  return {loginInfo, phoneNumber};
}

export default useSetLoginInfo;
