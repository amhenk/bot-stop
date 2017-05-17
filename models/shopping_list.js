const mongoose = require('mongoose');
const config = require('../config/database');

const ListSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true  /* The shopping list name should be unique */
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

module.exports.getListById = function(id, callback) {
  List.findById(id, callback);
}

module.exports.getListByName = function(userId, name, callback) {
  const query = {'userId': userId, 'name': name};
  List.findOne(query, callback);
}

module.exports.getListsByUserId = function(id, callback){
  const query = {'userId': id};
  List.find(query, callback);
}
