const allowedCors = [
  'http://zibrovmovies.diplom.nomoredomains.rocks',
  'https://zibrovmovies.diplom.nomoredomains.rocks',
  'http://api.zibrovmovies.diplom.nomoredomains.rocks',
  'https://api.zibrovmovies.diplom.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000'
];

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  
    res.header('Access-Control-Allow-Origin', "*");

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
