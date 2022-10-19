import {ImageSourcePropType} from 'react-native';
import {useEffect, useState} from 'react';
import api from '../utils/api.utils';

interface reformListType {
  mainImageName: ImageSourcePropType;
  expertName: string;
  heartCheck: number;
  beforeImageName: string;
  contents: string;
  price: number;
  reformId: number;
  afterImageName: string;
  storeName: string;
  expertUUId: number;
  reformName: string;
  heartId: object;
}

function useGetReformList(token: string) {
  const [reformList, setReformList] = useState<reformListType[]>();
  useEffect(() => {
    const fetchReformList = async () => {
      try {
        const firstResult = await api.get(
          '/api/v1/user/reform/product/list?limit=6&page=0',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const secondResult = await Promise.all(
          firstResult?.data?.data?.map((images: reformListType) =>
            api.get(
              `/api/v1/user/image/view?imageName=${images.mainImageName}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
          ),
        );
        setReformList(
          firstResult?.data?.data?.map((el: reformListType, idx: number) => {
            return {...el, mainImageName: secondResult[idx]};
          }),
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchReformList();
  }, [token]);

  return reformList;
}

export default useGetReformList;
