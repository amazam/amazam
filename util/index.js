import { AMAZON_ACCESS_KEY, AMAZON_ASSOCIATE_ID, AMAZON_SECRET_KEY } from 'react-native-dotenv';

const amazon = require('./amazon-product-api');

const getResultAmazon = async (item) => {
  const client = amazon.createClient({
    awsId: AMAZON_ACCESS_KEY,
    awsSecret: AMAZON_SECRET_KEY,
    awsTag: AMAZON_ASSOCIATE_ID,
  });

  const result = await client.itemSearch({
    keywords: item,
    itemPage: '1',
    responseGroup: 'ItemAttributes, Images',
  });

  return result;
};

export default getResultAmazon;
