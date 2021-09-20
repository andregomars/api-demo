export default async (req, res) => {
  const { isrc } = req.params;

  try {
    const track = await Track.findByPk(isrc, { 
      attributes: [`isrc`, `title`, `image`], 
      include: [{ model: Artist, as: `artists`, attributes: [`name`] }], 
      nest: true,
    });
    
    if (track) {
      console.warn(`Track is found for ISRC: ${isrc} in library!`);
      res.status(200).send(track);
    } else {
      console.warn(`No track is found for ISRC: ${isrc} in library!`);
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to get track by ISRC ${isrc} due to ${err.message}`);
  }

};