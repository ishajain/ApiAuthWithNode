import passport from 'passport'
const JWTStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from './config/keys'
import User from './models/user'

passport.use(
    // JSON WEB TOKEN STRATEGY
    new JWTStrategy(
        {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: JWT_SECRET
        },
    async(payload, done) => {
        try {
            //we have user data in the payload under the propety sub - Remember when creating token we have specified the sub property
            const user = await User.findById(payload.sub)         
            //If user does not exist
            if(!user) return done(null,false)
            //If user exist
            return done(null,user)
        } catch (error) {
            done(error,false)
        }
    })
)

passport.use(
   //LOCAL STRATEGY
   new LocalStrategy(
    {
        usernameField : "email"
    },
    async(email,password,done) => {
        try{

            //Find the user by email
            const user = await User.findOne({email})
            //User not found
            if(!user) return done(null, false)
            //If user found then check for password
             //If password is incorrect
            const isMatched = await user.isValidPassword(password)
            
            if(!isMatched) return done(null, false)
            //Otherwise return the user
            return done(null,user)
        }
        catch(error){
            return done(error,false)
        }
    })
)