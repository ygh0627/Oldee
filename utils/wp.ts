import {Dimensions, PixelRatio} from 'react-native';

export const wp = (pixel: number) => {
  const DESIGNED_DEVICE_WIDTH = 375;
  const DEVICE_WIDTH = Dimensions.get('window').width; //가변적 값 사용자 디바이스
  const ratio = DEVICE_WIDTH / DESIGNED_DEVICE_WIDTH;
  return PixelRatio.roundToNearestPixel(pixel * ratio);
};
