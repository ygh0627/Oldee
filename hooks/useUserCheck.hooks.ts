import {AxiosResponse} from 'axios';
import {loginInfoType} from './useSetLoginInfo.hooks';
import {useEffect, useState} from 'react';
import api from '../utils/api.utils';

function useUserCheck(loginInfo: loginInfoType | undefined) {
  const [checkResult, setCheckResult] = useState<AxiosResponse>();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await api.post('api/v1/sns/naverlogin', loginInfo, {
          headers: {
            Authorization: 'clo',
          },
        });
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
