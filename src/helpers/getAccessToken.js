import qs from 'querystring';
import axios from 'axios';

export default async () => {
  const { oauth_url, client_id, client_secret } = Beyond.spotify;

  const data = qs.stringify({ grant_type: `client_credentials`, client_id, client_secret });
  const config = {
    method: `post`,
    url: oauth_url,
    data,
  };

  const response = await axios(config);
  const { access_token } = response.data;

  return access_token;
};