const { Router } = require('express');

const router = Router();
const { pullUpdatedStock } = require('../handler/getUpdatedStocks');

router.post('/', (req, res) => {
  // Planning to add it to messaging queue for simplicity adding it to a object.
  pullUpdatedStock(req.body);
  res.status(200).send('OK');
});

module.exports = router;
