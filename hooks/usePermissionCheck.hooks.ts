import {useEffect, useMemo, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {checkMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

export interface Permission {
  type:
    | 'ios.permission.CAMERA'
    | 'ios.permission.PHOTO_LIBRARY'
    | 'ios.permission.PHOTO_LIBRARY_ADD_ONLY'
    | 'android.permission.CAMERA'
    | 'android.permission.READ_EXTERNAL_STORAGE'
    | 'android.permission.RECORD_AUDIO';
}

function usePermissionCheck() {
  const [allChecked, setAllChecked] = useState(true);

  const platform: Permission['type'][] = useMemo(() => {
    if (Platform.OS === 'ios') {
      return [
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      ];
    } else {
      return [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      ];
    }
  }, []);

  useEffect(() => {
    const permissionCheck = () => {
      const requestCameraPermission = async () => {
        try {
          const result = await checkMultiple(platform);
          (Object.keys(result) as Permission['type'][])
            .map(el => result[el])
            .every(el => el === RESULTS.GRANTED)
            ? setAllChecked(true)
            : setAllChecked(false);
        } catch (err) {
          Alert.alert('권한 승인이 필요합니다.');
          console.warn(err);
        }
      };

      requestCameraPermission();
    };
    permissionCheck();
  }, [platform]);

  return [allChecked, platform];
}

export default usePermissionCheck;
