export default (req, res, next) => {
  if (!req.headers.authorization || req.get(`authorization`) !== `Basic ${Beyond.auth_token}`) {
    return res.status(401).send();
  }

  return next();
};
