const crypto = require('../crypto');

import { AMAZON_ACCESS_KEY, AMAZON_ASSOCIATE_ID, AMAZON_SECRET_KEY } from 'react-native-dotenv';

const generateSignature = (stringToSign) => {
  const hmac = crypto.createHmac('sha256', AMAZON_SECRET_KEY);
  const signature = hmac.update(stringToSign).digest('base64');

  return signature;
};

const generateUrl = (searchString) => {
  const domain = 'webservices.amazon.com';
  const timestamp = new Date().toISOString();

  const paramsForAmazon = `?Service=AWSECommerceService&AWSAccessKeyId=${AMAZON_ACCESS_KEY}&AssociateTag=${AMAZON_ASSOCIATE_ID}&Operation=ItemSearch&Keywords="${searchString}"&Timestamp=${timestamp}`;
  const signature = encodeURIComponent(generateSignature(`GET\n${domain}\n/onca/xml${paramsForAmazon}`)).replace(/\+/g, '%2B');
  const queryString = `https://${domain}/onca/xml?${paramsForAmazon}&Signature=${signature}`;

  return queryString;
};

export default generateUrl;
