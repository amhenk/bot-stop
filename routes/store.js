const express = require('express');
const router = express.Router();
const config = require('../config/database');
const inventory = require('../models/inventory');

router.get('/inventory', (req, res, next) => {
  // For now just grab everything
  inventory.getAllItems((err, items) => {
    if(err){
      console.log('store.js Returning nothing');
      throw err;
    }
    // res.json({success: true, inventory: items});
    res.send(items);
  });
  // return res.json();
});

// Dummy request to make sure things are working
router.get('/hello', (req, res, next) => {
  console.log('Hello!');
  res.json({success: true, message: 'Hi!'});
});

router.get('/inventory/category', (req, res, next) => {
  inventory.getItemsByCategory(req.category, (err, items) => {
    if(err){
      throw err;
    } else {
      res.send(items);
    }
  });
});

router.get('/inventory/getItemById', (req, res, next) => {
  inventory.getItemById(req.query.item_id, (err, item) => {
    if(err){
      throw err;
    } else {
      res.send(item);
    }
  });
});

router.post('/addItem', (req, res, next) => {
  let newItem = new inventory({
    category: req.body.category,
    name: req.body.name,
    sales_price: req.body.sales_price,
    item_id: req.body.item_id,
    item_type: req.body.item_type,
    left_in_stock: req.body.left_in_stock,
    automated: req.body.automated
  });

  inventory.addItem(newItem, (err, item) => {
    if(err) {
      return res.json({success: false, msg:'Failed to add Item'});
    } else {
      console.log('Adding item succeeded');
      return res.json({success: true, msg:'Item added.'});
    }
  });
});

router.delete('/removeitem', (req, res, next) => {
  inventory.deleteItemById(req.body._id, (err, item) => {
    if(err) {
      return done(err, false);
    }
    res.json({success: true, msg: "Item removed"});

  });
});

module.exports = router;
