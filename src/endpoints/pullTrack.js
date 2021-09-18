import axios from 'axios';
import getAccessToken from '../helpers/getAccessToken';

export default async (req, res) => {
  const { isrc } = req.params;
  const params = {
    q: `isrc:${isrc}`,
    type: `track`
  }

  console.log(`Start to pull track for ISRC ${isrc}.`);

  try {

    const access_token = await getAccessToken();
    const config = {
      method: `get`,
      // url: Beyond.spotify.search_api_url + `?q=isrc:USVT10300001&type=track`,
      url: Beyond.spotify.search_api_url,
      params,
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
    const { data } = await axios(config);

    if (!_.has(data, `tracks.items`) || data.tracks.items.length < 1) {
      console.log(`No track info can be found for ISRC ${isrc}`);
      return res.status(204).send();
    }

    const { items } = data.tracks;

    const item_most_popular = _.maxBy(items, `popularity`);
    const title = item_most_popular.name;
    const artists = _.map(item_most_popular .album.artists, `name`);
    const image = _.get(item_most_popular, `album.images[0].url`);

    console.log(title, artists, image)

    console.log(`Finish to pull track for ISRC ${isrc}.`);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();

  }

};