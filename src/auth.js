import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { User, Question } from './models'
import { SESS_NAME, JWT_SECRET } from './config'

const createToken = (user, secret, expiresIn) => {
  const { email } = user
  return jwt.sign({ email }, secret, {expiresIn})
}

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again'
  const token = await createToken({ email }, JWT_SECRET, '5hr')
  const user = await User.findOneAndUpdate({ 'email': email }, {$set: {token: token}}, {new: true})
  if (!user) {
    throw new AuthenticationError(message)
  }

  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }
  return user
}

// const signedIn = async req => {
//   const user = await User.findById(req.session.userId)
//   if(user === null) {
//     return false
//   }
//   return user
// }

export const checkSignedIn = async req => {
  try {
    const user = await User.find({email: req.currentUser.email})
    if (!user) {
      throw new AuthenticationError('You must be signed in')
    }
  } catch (err) {
    throw new Error(err)
  }
}

// export const checkSignedOut = req => {
//   if (signedIn(req)) {
//     throw new AuthenticationError('You are already signed in')
//   }
// }

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)
      res.clearCookie(SESS_NAME)
      resolve(true)
    })
  }
)

export const checkValidUser = async (id, req) => {
  const message = 'You cannot correct this answer'
  const question = await Question.find({ ansids: id })
  if (!question || question.userId === req.session.userId) {
    throw new AuthenticationError(message)
  }
  return question
}
