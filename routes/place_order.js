const express = require('express');
const router = express.Router();
const config = require('../config/database');
const order = require('../models/order');

router.post('/add_order', (req, res, next) => {
  // For now just grab everything
  inventory.getAllItems((err, items) => {
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
  res.json({success: true, message: 'Hi!'});
});
