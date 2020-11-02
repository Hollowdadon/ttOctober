const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const { jwtSecret } = require('../config');

class AuthService {
  async register(req, res) {
    // get raw user input - only fields we care of, ignore the rest...
    const { email, password, role } = req.body;

    if (role === 'admin') {
      // FIXME: disable registering users as admins - it's allowed for a quick demo only
      console.warn('🐛 [FIXME] disable registering users as admin (temporary alloed for demo purposes)');
    }

    // TODO: add user input validation

    // prepare user DTO
    const userDTO = {
      email,
      password,
      role,
    };

    UserModel(userDTO).save((error, user) => {
      if (error) {
        res.status(500).json({ error });
        throw error;
      }

      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
        expiresIn: '24h',
      });

      res.status(201).send({ auth: true, accessToken: token });
    });
  }

  async login(req, res) {
    // get raw user input - only fields we care of, ignore the rest...
    const { email, password } = req.body;

    console.log(email, password)
    UserModel.findOne({ email }, (error, user) => {
      if (error || !user) {
        res.status(404).json({ error: 'user not found' });
        throw error;
      }

      try {
        user.comparePassword(password, (error, isMatch) => {
          if (error || !isMatch) {
            return res.status(403).json({ error: 'incorrect credentials' });
          }

          const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
            expiresIn: '24h',
          });

          res.status(200).send({ auth: true, accessToken: token });
        });
      } catch (error) {
        res.status(500).json({ error });
        throw error;
      }
    });
  }
}

module.exports = AuthService;
