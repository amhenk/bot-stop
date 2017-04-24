const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Order Schema
const OrderSchema = mongoose.Schema({
  customer_id: String,    // TODO: See if this is actually how this works
  items: [String],
  order_number: String,   // XXX: This probably needs to be something more robust to ensure no overlaps
  order_cost: Number
});

const Order = module.exports = mongoose.model('order', OrderSchema);

module.exports.addOrder = function(newOrder, callback){
  newOrder.save(callback);
}

module.exports.updateOrder = function(updates, callback){
  Order.findOneandUpdate({order_number: updates.original_order_number},
                          updates.order,  // This is a copy with the new items appended and updated cost
                          {upsert: true},
                          callback);
}

module.exports.getOrdersByCustomerId = function(customer_id, callback){
  const query = {'cust_id': customer_id};
  Order.find(query, callback);
}
