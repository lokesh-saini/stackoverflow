import Joi from 'joi'

const email = Joi.string().email().required().label('email')

const username = Joi.string().alphanum().min(4).max(30).required().label('Username')

const name = Joi.string().max(254).required().label('Name')

const password = Joi.string().min(8).max(30).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).label('Password').options({
  language: {
    string: {
      regex: {
        base: 'must have atleast one lowercase letter, one uppercase letter, one digit, one special character and of atleast 8 digits'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  email, username, name, password
})

export const signIn = Joi.object().keys({
  email, password
})
