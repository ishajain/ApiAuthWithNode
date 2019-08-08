import JWT from 'jsonwebtoken'
import User from '../models/user'
import { JWT_SECRET } from '../config/keys'

const signToken = user => {
    return JWT.sign({
        iss : 'APIAUTHENTICATIONWITHNODE',
        sub:user.id,  // token for whom
        iat: new Date().getTime(), //current time
        exp: new Date().setDate( new Date().getDate() + 1), // expires in 1 day period
       
    },JWT_SECRET)
}

module.exports = {

    signUp : async (req,res,next) => {
        const { email,password} = req.value.body

        //check if the user with the email already exists in the database
        const userFound = await User.findOne({ "local.email" :email })
        if(userFound) res.status(403).json({error : "Email is already in use"})

        //If not then create new user
        const user = new User({
            method:"local",
            local: {
                email,
                password
            }
        })
        await user.save()

        //Generate Token
        const token = signToken(user)

        //Respond with the token
        res.status(200).json({token})

    },
    signIn : async (req,res,next) => {
       //Generate Token
       const token = signToken(req.user) // this user is provided to us by passort
       res.status(200).json({token,user:{ id: req.user.id, email: req.user.email}})
    },
    googleOAuthSignIn : async (req,res,next) => {
        //Generate Token
        const token = signToken(req.user) // this user is provided to us by passort
        res.status(200).json({token})
     },
    
    facebookOAuthSignIn: async (req,res,next) => {
        //Generate Token
        const token = signToken(req.user) // this user is provided to us by passort
        res.status(200).json({token})
     },
     
    secret : (req,res,next) => {
        res.send( { secret : "You have got the secret"})
    }
}
   