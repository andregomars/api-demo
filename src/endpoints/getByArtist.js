export default async (req, res) => {
  const { name } = req.params;

  try {
    const artists = await Artist.findAll({ attributes: [`isrc`], where: { name }, raw: true });
    if (!artists && artists.length < 1) {
      console.warn(`No track is found for Artist: ${name} in library!`);
      return res.status(204).send();
    }

    const isrc_array = _.chain(artists).uniq(`isrc`).map(`isrc`).value();

    const tracks = await Track.findAll({ 
      where: { isrc: isrc_array },
      attributes: [`isrc`, `title`, `image`], 
      include: [{ model: Artist, as: `artists`, attributes: [`name`] }], 
      nest: true,
    });

    if (tracks && tracks.length > 0) {
      console.warn(`Tracks are found for Artist: ${name} in library!`);
      res.status(200).send(tracks);
    } else {
      console.warn(`No track is found for Artist: ${name} in library!`);
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get tracks by Artist ${name} due to ${err.message}`);
  }

};