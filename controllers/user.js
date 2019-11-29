const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const saltRounds = 10;

const registerController = async (req, res, next) => {
    const { name, email, password, isAdmin } = req.body;
    try {
      const data = await User.findOne({ email });
      if (data) {
        return res.status(400).json({
          message: "User already exists"
        })
      } else {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
          name,
          password: hash,
          email,
          isAdmin
        })
        await newUser.save();
        console.log(data, hash)
        return res.status(201).json({
          message: 'User Created Successfully'
        })
      }
    } catch (err) {
      return next(err) 
    }
    // User.findOne({ email }, (err, data) => {
    //   if (data) {
    //     return res.status(400).json({
    //       message: "User already exists"
    //     })
    //   } else {
    //     bcrypt.hash(password, saltRounds, (err, hash) => {
    //       const newUser = new User({
    //         name,
    //         password: hash,
    //         email,
    //         isAdmin
    //       })
    //       newUser.save((err) => {
    //         if (err) {
    //           return next(err);
    //         } else {
    //           return res.status(201).json({
    //             message: 'User Created Successfully'
    //           })
    //         }
    //       });
    //     })
    //   }
    // }); 
}

const loginController = (req, res) => {
    const { email, password} = req.body
    User.findOne({ email }, (err, data) => {
      if (err) return next(err);
      if (!data) {
        return res.status(401).json({
          message: "User does not exists"
        })
      } else {
        bcrypt.compare(password, data.password, (err, match) => {
          if(!match) {
            return res.status(401).json({
              "message": "Invalid Password"
            }) 
          } else {
            console.log(data.isAdmin)
            const token = jwt.sign({ isAdmin: data.isAdmin }, process.env.SECRET, { expiresIn: '7h'})
            return res.status(200).json({
              message: "Logged In sucessfully",
              token
            })
          }
        })
      }
    })
}

module.exports = {
    registerController,
    loginController
}