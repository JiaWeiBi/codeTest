const middleware = require('@blocklet/sdk/lib/middlewares');
const expressJoi = require('@escook/express-joi');
const Joi = require('joi');
const txs = require('../controller/txs');
const router = require('express').Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || { msg: ' test' }));
router.get(
  '/txs',
  expressJoi({
    query: {
      a: Joi.string().required(),
      page: Joi.number().integer().min(1),
      perPage: Joi.number().integer().max(10000),
      sort: Joi.string().valid('asc', 'desc'),
    },
  }),
  txs.index
);

module.exports = router;
