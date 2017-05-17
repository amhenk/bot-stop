const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const List = require('../models/shopping_list');

// Profile
router.get('/profile', passport.authenticate('jwt',{session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// Validate
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE');
});

router.get('/getUserLists', (req, res, next) => {
  List.getListsByUserId(req.query.user_id, (err, lists) => {
    if(err) throw err;

    res.send(lists);
  });
});

router.get('/getListById', (req, res, next) => {
  List.getListById(req.query.list_id, (err, list) => {
    if(err) throw err;
    console.log(list);
    res.send(list);
  })
});

router.get('/getListByName', (req, res, next) => {
  const userId = req.query.user_id;
  const listName = req.query.list_name;
  List.getListByName(userId, listName, (err, list) => {
    if(err) throw err;
    console.log(list);
    res.send(list);
  })
})

// Register router
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user.'});
    } else {
      res.json({success: true, msg:'Registered user.'});
    }
  });
});

// Authentication
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;

    if(!user){
      return res.json({success: false, msg:'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.post('/updateList', (req, res, next) => {
  const itemList = new List(req.body.shopping_list);
  List.addShoppingList(itemList, (err, list) => {
    if(err) throw err;

    if(!list){
      console.log('List could not be added');
      return res.json({success: false, msg:'List could not be added'});
    }
    console.log('Adding list...');
    return res.json({success: true, msg:'List added!'});
  });

});

module.exports = router;
