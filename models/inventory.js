const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
/*
TODO: Mull this over, not sure if we should call it inventory or item.

I was thinking we have an item schema that we place into the inventory since
the inventory IS where you put your items.
 */
// Item Schema
const ItemSchema = mongoose.Schema({
  category: {
    type: String  // Produce, Pantry, Health, etc.
  },
  name: {
    type: String
  },
  sales_price: {
    type: Number // might be good to have what we sell for and how much we buy for
  },
  item_id: {
    type: String  // SKU or something like that
  },
  item_type: {
    type: String  // Is it a fruit or veggie? Chip or Cracker?
  },
  left_in_stock: {
    type: Number  // Ideally supposed to help us both manage and inform
  },
  automated: {
    type: Boolean // False means it's self-serve
  }
});

const Inventory = module.exports = mongoose.model('Inventory', ItemSchema);

module.exports.deleteItemById = function(id, callback) {
  Inventory.findById(id).remove(callback);
}

module.exports.getItemById = function(id, callback) {
  Inventory.findById(id, callback);
}

module.exports.getAllItems = function(callback) {
  Inventory.find({}, callback);
}

module.exports.getItemsByCategory = function(category, callback) {
  Inventory.find({category: category}, callback);
}

module.exports.addItem = function(newItem, callback){
  newItem.save(callback);
}

module.exports.getItemByItemNumber = function(item_number, callback) {
  let query = {'item_id': item_number};
  Inventory.find(query, callback);
}

module.exports.getItemsByName = function(item_name, callback) {
  let query = {'name': {$regex: item_name, $options: 'i'}};
  Inventory.find(query, callback);
}
