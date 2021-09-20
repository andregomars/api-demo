import axios from 'axios';
import getAccessToken from '../helpers/getAccessToken';

export default async (req, res) => {
  const { isrc } = req.params;
  const params = {
    q: `isrc:${isrc}`,
    type: `track`
  }

  console.log(`Start to import track for ISRC ${isrc} from Spotify.`);

  try {
    const access_token = await getAccessToken();
    const config = {
      method: `get`,
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

    const track = _.maxBy(items, `popularity`);
    const title = track.name;
    const artists = _.map(track.artists, `name`);
    const image = _.get(track, `album.images[0].url`);

    const existing_track = await Track.findOne({ where: { isrc }, raw: true });
    if (existing_track) {
      console.error(`Found conflict on ISRC ${isrc} in stored library!`);
      return res.status(409).send();
    }

    await Track.create({ isrc, title, image });
    for (const artist of artists) {
      await Artist.create({ name: artist, isrc });
    }

    console.log(`Finish to import track for ISRC ${isrc}.`);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to import track for ISRC ${isrc} due to ${err.message}`);

  }

};