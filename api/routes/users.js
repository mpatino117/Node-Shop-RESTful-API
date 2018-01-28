const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const torch = require('torch')

const {SECRET_JSON_KEY} = process.env

const User = require('../models/user')

router.post('/signup',(req, res, next) => {
        // if email already exist deny and message user
  User.find({email: req.body.email})
    .exec()
    .then((response) => {
      console.log(response)
      console.log(response.length)
      if(response.length >= 1){
        return  res.status(409).json({
          message:"Email already exists"
        })

      } else {
        // bcrypt is the proper way to store passwords in your database regardless of whatever language your backend is built 
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
                res.status(201).json({
                  message:'signup success',
                  result:result
                })
              })
      
              .catch(err => {
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

router.post('/login',(req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then((user)=>{
        if(user.length < 1){
          res.status(401).json({
            message:'Auth failed '
          })
        }

        bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
          if(err){
            return  res.status(401).json({
              message:'Auth failed '
            })
          }
          if(result){
            // utilzin jwt sign token and data we wnat in our json token

        const token =  jwt.sign({
              email: user[0].email,
              id:user[0].password
            }, 
            SECRET_JSON_KEY,
            { expiresIn: '1h' }
          )

            return res.status(200).json({
              message:'Auth Successful',
              token:token
            })
          }
            // if they all fail
            res.status(401).json({
              message:'Auth failed '
          })
        })
      // const user = new User({
      //   _id: new mongoose.Types.ObjectId(),
      //   email: account.body.email,
      //   password: account.body.password
      // })

      // user.save()
      //   .then(result => {
      //     res.status(201).json({
      //       message:'signin success',
      //       result:result
      //     })
      //   })
      //   .catch(err => {
      //     res.status(500).json({
      //       message:'Error signin in',
      //       error: err
      //     })
      //   })
    
  })
    .catch((err)=> {
      console.log(err)
      res.status(500).json({
        message:err
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