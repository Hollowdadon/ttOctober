const UserInfoModel = require('../models/userInfo');

class UserInfoService {
  async list(req, res) {
    const { page = 0, limit = 10 } = req.query;
    const skip = parseInt(page, 10) || 0;
    const limitPerPage = Math.min(parseInt(limit, 10), 100); // limit to max 100 per one request

    UserInfoModel.find({})
      .sort('-createdAt')
      .skip(skip)
      .limit(limitPerPage)
      .exec((error, data) => {
        if (error) {
          res.status(500).json(error);
          throw error;
        }

        res.status(200).json(data);
      });
  }

  async add(req, res) {
    // get raw user input - only fields we care of, ignore the rest...
    const { firstName, lastName, phone, address, ssn } = req.body;

    // TODO: add user input validation

    // prepare user DTO
    const userInfoDTO = {
      firstName,
      lastName,
      phone,
      address,
      ssn,
    };

    UserInfoModel(userInfoDTO).save((error, info) => {
      if (error) {
        res.status(500).json({ error });
        throw error;
      }

      res.status(201).json(info);
    });
  }
}

module.exports = UserInfoService;
