const axios = require('axios');
const logger = require('../libs/logger');

const HttpsProxyAgent = require('https-proxy-agent');
const httpsAgent = new HttpsProxyAgent(`http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`);
const axiosClient = axios.create({
  baseURL: 'https://api.etherscan.io',
  timeout: 10000,
  httpsAgent,
  proxy: false,
});
const API = require('etherscan-api').init(process.env.API_KEY, null, 10000, axiosClient);

async function index(req, res) {
  const { a } = req.query;
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const sort = req.query.sort || 'asc';

  if (perPage > 10000) {
    return res.json({ status: 0, message: 'max perPage is 10000 only' });
  }
  try {
    const data = await API.account.txlist(a, 0, 99999999, page, perPage, sort);

    if (data.status == 1) {
      return res.json(data);
    }

    return res.json({ status: 0, message: data.message || 'search error' });
  } catch (e) {
    logger.error(e);
    res.json({ status: 0, message: e || 'something wrong' });
  }
}

module.exports = {
  index,
};
