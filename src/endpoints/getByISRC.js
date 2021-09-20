export default async (req, res) => {
  const { isrc } = req.params;

  try {
    const track = await Track.findByPk(isrc, { include: [`artists`], raw: true, nest: true });

    if (track) {
      const output = _.pick(track, [`isrc`, `title`, `image`, `artists.name`]);

      console.warn(`Track is found for ISRC: ${isrc} in library!`);
      res.status(200).send(output);
    } else {
      console.warn(`No track is found for ISRC: ${isrc} in library!`);
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get track by ISRC ${isrc} due to ${err.message}`);
  }

};