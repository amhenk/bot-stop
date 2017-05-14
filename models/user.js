const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: {
    type: Array,
    required: false
  },
  shopping_lists: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hast) => {
      if(err) throw err;
      newUser.password = hast;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.addShoppingList = function(id, shopping_list, callback){
  console.log(shopping_list);
  const query = {'_id': id, '$push': {'shopping_lists': shopping_list}};
  User.findOneAndUpdate(query, callback);
}

module.exports.removeShoppingList = function(id, shopping_list_name, callback){
  const query = {'_id': id, '$pull': {'shopping_list.$.name': shopping_list_name}};
  User.findOneAndUpdate(query, callback);
}
