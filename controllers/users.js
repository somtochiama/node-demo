const users = require('../models/user');

const getAllUsers = (req, res, next) => {
    // res.send('respond with a resource');
    users.find((err, data) => {
      if (err) return next(err)
      res.status(200).json({
        message: "Users returned sucessfully",
        data
      })
    })
}

const updateUser = (req, res, next) => {
    if(!req.admin) {
        return res.status(401).json({
            message: "You need to be an admin"
        });
    } else {
        users.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err) => {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({
                    message: "User updated successfully"
                })
            }
        })
    }
}

 module.exports = {
     getAllUsers,
     updateUser
 }