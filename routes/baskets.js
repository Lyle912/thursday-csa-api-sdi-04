const express = require('express');
const router = express.Router();
const knex  = require('../db/knexConfig');

/* GET baskets listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  knex('baskets').then(data =>{
    res.json(data)
  })
});

router.post('/', function(req, res, next) {
  knex('baskets').insert(req.body).returning('*').then(data=>{
    if(Array.isArray(data)) data=data[0]
    res.json(data)
  })
})

module.exports = router;
