const express = require('express');
const router = express.Router();
const config = require('../config/database');
const order = require('../models/order');

router.post('/addOrder', (req, res, next) => {
  // For now just grab everything
  const newOrder = new order({
    customer_id : '',
    items: req.body.items,
    order_number: req.body.order_number,
    order_cost: req.body.order_cost
  });

  order.addOrder(newOrder,(err, order) => {
    if(err){
      console.log('order.js Returning nothing');
      throw err;
    }
    console.log('order.js Returning success');
    // return res.json({success: true, msg: 'Order Placed'});
    return res.send({success: true, msg: 'Order Placed'});
  });
  // return res.json();
});

// Dummy request to make sure things are working
router.get('/hello', (req, res, next) => {
  console.log('Hello!');
  return res.json({success: true, message: 'Hi!'});
});

module.exports = router;
