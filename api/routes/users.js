const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')

const torch = require('torch')

const User = require('../models/user')

router.post('/signup',(req, res, next) => {
        // if email already exist deny and message user
  User.find({email: req.body.email})
    .exec()
    .then((response) => {
      if(response){
        torch.blue(response)
       return  res.status(422).json({
          message:"Email already exists"
        })
      } else {
        bcrypt.hash(req.body.password, 10,(err, hash) => {
          if(err){
            return res.status(500).json({
              error:err
            })
          } else {
            
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
      
            user.save()
              .then(result => {
                torch.green(result)
                res.status(201).json({
                  message:'signup success',
                  result:result
                })
              })
      
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  message:'Error signup in',
                  error: err
                })
              })
          }
        })
      }
  })
})

router.post('/signin',(req, res, next) => {

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  })

  user.save()
  .then(res => {
    res.status(201).json({
      message:'signin success',
      result:res
    })
  })
  .catch(err => {
    res.status(500).json({
      message:'Error signin in',
      error: err
    })
  })
})


router.delete('/:emailId',(req, res, next) => {
  const emailId = req.params.emailId
  User.remove({_id:emailId})
  .exec()
  .then(result => {
    res.status(201).json({
      message:'delete success',
      result:result
    })
  })
  .catch(err => {
    res.status(500).json({
      message:'delete user fail',
      error: err
    })
  })
})

router.get('/all',(req, res, next) => {
  User.find()
    .exec()
    .then(item => {
      res.status(201).json({
        count:item.length,
        message:'View all success',
        result:item
      })
    })
    .catch(err => {
      res.status(500).json({
        message:'Fail to View all',
        error: err
      })
    })
})

module.exports = router