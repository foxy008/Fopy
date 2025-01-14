const { signToken, verifyToken } = require('../helpers/jwt')
const { Administrator, User } = require('../models')

const authenticationAdmin = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      {
        throw { name: 'Invalid token' }
      }
    }
    else {
      const codeToken = verifyToken(access_token)

      const checkAdminInDatabase = await Administrator.findOne({
        where: {
          email: codeToken.email
        }
      })

      if (!checkAdminInDatabase) {
          throw { name: "Invalid token" }
      }
        req.admin = checkAdminInDatabase
        next()
    }
  } catch (error) {
    next(error)
  }
}

const authentication = async (req, res, next) => {
  try {
    const { access_token, role } = req.headers;

    if (!access_token) throw { name: 'INVALID_TOKEN' };

    const decode = verifyToken(access_token, process.env.SECRET);

    const user = await Administrator.findByPk(decode.id);

    if (!user) throw { name: 'INVALID_TOKEN' };


    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

const authenticationUser = async (req, res, next) => {
    try {
        // bawa kartu id gak lu ?
        const {access_token} = req.headers
        
        if (!access_token) {
            return res.status(401).json({message: "Invalid Token" })
        }

        // ini token asli gak ?
        const userId = verifyToken(access_token)

        // cek apakah pemilik kartu id ini masih terdaftar di server atau tidak 
        const user = await User.findOne({where: {email: userId.email}})

        if (!user) {
            return res.status(401).json({message: "Invalid Token" })
        }

        req.user = user 
        
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication, authenticationAdmin, authenticationUser };
