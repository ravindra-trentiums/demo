var express = require('express');
const models = require('../models/index');
const sequelize = require('sequelize');
const jwt= require('jsonwebtoken')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('working');
});

router.post('/submitForm', async function (req, res, next) {
  let reqBody = req.body
  let user = await models.User.create({
    email: reqBody.email,
    fullName: reqBody.fullName,
    password: reqBody.password,
    mobile: reqBody.mobile,
    createdAt: Date(),
    updatedAt: Date(),
  });
  if (user) {
    res.json({
      message: 'user created successfully',
    });
  } else {
    res.status(400).send({
      message: 'Error while creating user',
    });
  }
});

router.put('/submitForm', async function (req, res, next) {
  let reqBody = req.body
  let user = await models.User.update({
    ...reqBody
  },{
    where:{
      userID:reqBody.userID
    }
  });
  if (user) {
    res.json({
      message: 'user updated successfully',
    });
  } else {
    res.status(400).send({
      message: 'Error while creating user',
    });
  }
});

router.post('/login', async function (req, res, next) {
  let reqBody = req.body
  let user = await models.User.findOne({
    attributes:['userID','email'],
    where: {
      email: reqBody.email,
      password: reqBody.password,
    }
  });
  if (user) {
    let token = jwt.sign({ user }, 'tokenKey', {
      expiresIn: 30 * 24 * 60 * 60,
    });
    res.json({
      message: 'user login successfully',
      token
    });
  } else {
    res.status(400).send({
      message: 'Error while login user',
    });
  }
});

router.get('/user', async function (req, res, next) {
  let user = await models.User.findAll({
  });
  if (user) {
    res.json({
      user
    });
  } else {
    res.status(400).send({
      message: 'Error while login user',
    });
  }
});

router.get('/user/:id', async function (req, res, next) {
  let user = await models.User.findOne({
    where:{
      userID:req.params.id
    }
  });
  if (user) {
    console.log(user.dataValues)
    res.json({
      user
    });
  } else {
    res.status(400).send({
      message: 'Error while login user',
    });
  }
});

router.delete('/user', async function (req, res, next) {
  console.log(req.body.userID)
  let user = await models.User.destroy({
    where:{
      userID:req.body.userID
    }
  });
  if (user) {
    res.json({
      message:"User deleted successfully."
    });
  } else {
    res.status(400).send({
      message: 'Error while login user',
    });
  }
});


module.exports = router;
