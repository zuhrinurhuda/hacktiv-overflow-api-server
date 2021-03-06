const User = require('../models/userModel')
const generateJwtToken = require('../helpers/generateJwtToken')

class UserController {
  static signupOrLogin (req, res) {
    User.findOne({ email: req.body.email })
    .then(user => {
      user.lastLogin = Date.now()
      if (user) {
        // jika user sudah ada
        generateJwtToken(user)
        .then(jwtToken => res.status(200).json({
          message: 'Login success!',
          accesstoken: jwtToken,
          user: user
        }))
        .catch(err => res.status(500).send(err))
      } else {
        // jika user belum ada
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: req.body.avatar
        })

        newUser.save()
        .then(newUser => {
          newUser.lastLogin = Date.now()
          generateJwtToken(newUser)
          .then(jwtToken => res.status(200).json({
            message: 'Login success!',
            accesstoken: jwtToken,
            user: newUser
          }))
          .catch(err => res.status(500).send(err))
        })
        .catch(err => res.status(500).send(err))
      }
    })
    .catch(err => res.status(500).send(err))
  }

  static findAll (req, res) {
    User.find()
    .then(users => res.status(200).json({
      message: 'Success find all users',
      users: users
    }))
    .catch(err => res.status(500).send(err))
  }

  static findById (req, res) {
    User.findById(req.decoded._id)
    .then(user => res.status(200).json({
      message: 'Success find user',
      user: user
    }))
    .catch(err => res.status(500).send(err))
  }

  static update (req, res) {
    User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name || user.name
      user.avatar = req.body.avatar || user.avatar
      user.save()
      .then(newUserData => res.status(200).json({
        message: 'Success update data user',
        updatedUser: newUserData
      }))
      .catch(err => res.status(500).send(err))
    })
  }

  static delete (req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(result => res.status(200).json({
      message: 'Success delete user',
      deletedUser: result
    }))
    .catch(err => res.status(500).send(err))
  }
}

module.exports = UserController