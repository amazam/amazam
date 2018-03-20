import {
  AMAZON_ACCESS_KEY,
  AMAZON_ASSOCIATE_ID,
  AMAZON_SECRET_KEY,
} from 'react-native-dotenv';

import amazon from '../util/amazon-product-api';

const getProductAmazon = async (imageRecognitionResult) => {
  const client = amazon.createClient({
    awsId: AMAZON_ACCESS_KEY,
    awsSecret: AMAZON_SECRET_KEY,
    awsTag: AMAZON_ASSOCIATE_ID,
  });

  try {
    const productList = await client.itemSearch({
      keywords: imageRecognitionResult.data.name,
      itemPage: '1',
      responseGroup: 'ItemAttributes, Images',
    });

    return productList;
  } catch (error) {
    throw error;
  }
};

export default getProductAmazon;
