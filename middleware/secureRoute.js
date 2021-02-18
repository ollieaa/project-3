import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()

export default async function secureRoute(req, res, next) {

  try {
    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).send({message: 'Unauthorized Access, not an auth-token'})
    }
    const token = authToken.replace('Bearer ', '')

    jwt.verify(token, secret, async (err, data) => {

      if (err) {
        return res.status(401).send({message: 'Unauthorized Access'})
      }
      const user = await User.indById(data.userId)

      if (!user) {
        return res.status(401).send({message: 'Unauthorized, user not found'})
      }
      req.currentUser = user

      next()
    })
  } catch (err) {
    res.status(401).send({message: 'Unauthorized Access'})
  }
}