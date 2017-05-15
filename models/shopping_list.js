const mongoose = require('mongoose');
const config = require('../config/database');

const ListSchema = mongoose.Schema({
  name: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
});

const List = module.exports = mongoose.model('ShoppingList', ListSchema);

module.exports.addShoppingList = function(newList, callback) {
  newList.save(callback);
}
