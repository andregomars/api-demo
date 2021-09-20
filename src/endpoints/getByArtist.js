export default async (req, res) => {
  const { name } = req.params;

  try {
    const artists = await Artist.findAll({ attributes: [`isrc`], where: { name }, raw: true });
    const isrc_array = _.chain(artists).uniq(`isrc`).map(`isrc`).value();

    const tracks = await Track.findAll({ where: { isrc: isrc_array }, include: [`artists`], raw: true, nest: true });

    if (tracks && tracks.length > 0) {
      const output = _.map(tracks, (track) => _.pick(track, [`isrc`, `title`, `image`, `artists.name`]));
      console.warn(`Tracks are found for Artist: ${name} in library!`);
      res.status(200).send(output);
    } else {
      console.warn(`No track is found for Artist: ${name} in library!`);
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get tracks by Artist ${name} due to ${err.message}`);
  }

};