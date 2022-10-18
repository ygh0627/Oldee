import {AxiosResponse} from 'axios';
import {loginInfoType} from './useSetLoginInfo.hooks';
import {useEffect, useState} from 'react';
import api from '../utils/api.utils';

function useUserCheck(loginInfo: loginInfoType | undefined) {
  const [checkResult, setCheckResult] = useState<AxiosResponse>();
  console.log('유저정보', loginInfo);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await api.post(
          'api/v1/sns/naverlogin',
          {
            accessToken: loginInfo?.accessToken,
            refreshToken: loginInfo?.refreshToken,
            userEmail: loginInfo?.email,
            userSnsId: loginInfo?.userSnsId,
            expireAt: loginInfo?.expireAt,
          },
          {
            headers: {
              Authorization: 'clo',
            },
          },
        );
        setCheckResult(result);
      } catch (e) {
        console.log(e);
        return;
      }
    };
    if (
      loginInfo?.accessToken &&
      loginInfo.email &&
      loginInfo.expireAt &&
      loginInfo.refreshToken &&
      loginInfo.userSnsId
    ) {
      checkUser();
    }
  }, [loginInfo]);

  return checkResult;
}

export default useUserCheck;
