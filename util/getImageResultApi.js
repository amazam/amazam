import axios from 'axios';
import { CLOUDSIGHT } from 'react-native-dotenv';

const getResultFromApi = (analysisUrl, timeout, counter) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(analysisUrl, {
        headers: {
          Authorization: `CloudSight ${CLOUDSIGHT}`,
          'Cache-Control': 'no-cache',
        },
      })
        .then((resultData) => {
          if (counter <= 3) {
            switch (resultData.data.status) {
            case 'completed': {
              resolve(resultData);
              break;
            }
            case 'not completed': {
              resolve(getResultFromApi(analysisUrl, 2000, counter + 1));
              break;
            }
            default: reject(new Error(resultData.data.status));
            }
          } else {
            reject(new Error('Cannot get the data from image recognition'));
          }
        })
        .catch((imageError) => {
          reject(imageError);
        });
    }, timeout);
  });

export default getResultFromApi;
