const express = require('express');
const router = express.Router();
const config = require('../config/database');
const order = require('../models/order');

router.post('/addOrder', (req, res, next) => {
  // For now just grab everything
  const newOrder = {
    customer_id : req.customer_id,
    items: req.body.skuArray,
    order_number: req.body.order_number,
    order_cost: req.body.order_cost
  }

  order.addOrder((err, items) => {
    if(err){
      console.log('order.js Returning nothing');
      throw err;
    }
    // res.json({success: true, inventory: items});
    res.send(order);
  });
  // return res.json();
});

// Dummy request to make sure things are working
router.get('/hello', (req, res, next) => {
  console.log('Hello!');
  return res.json({success: true, message: 'Hi!'});
});
