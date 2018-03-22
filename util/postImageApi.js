import axios from 'axios';
import { CLOUDSIGHT } from 'react-native-dotenv';

// const CLOUDSIGHTSERVER = 'https://api.cloudsight.ai/v1/images';
// const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-proxy.com/v1/images';
const CLOUDSIGHTSERVER = 'https://private-anon-0dcf546523-cloudsight.apiary-mock.com/v1/images';

const postImageApi = async (picture) => {
  try {
    const postImageResponse = await axios.post(CLOUDSIGHTSERVER, {
      image: `data:image/png;base64,${picture}`,
      locale: 'en_US',
    }, {
      headers: {
        Authorization: `CloudSight ${CLOUDSIGHT}`,
        'Cache-Control': 'no-cache',
      },
    });

    return `${CLOUDSIGHTSERVER}/${postImageResponse.data.token}`;
  } catch (error) {
    throw error;
  }
};

export default postImageApi;
