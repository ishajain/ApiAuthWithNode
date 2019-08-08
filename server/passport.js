import passport from 'passport'
const JWTStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')

const ExtractJwt = require('passport-jwt').ExtractJwt
import bcrypt from 'bcryptjs'
import { JWT_SECRET, GOOGLE_ClIENT_ID, GOOGLE_ClIENT_SECRET, FACEBOOK_APP_ID,FACEBOOK_APP_SECRET } from './config/keys'
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
);


passport.use(
   //LOCAL STRATEGY
   new LocalStrategy(
    {
        usernameField : "email"
    },
    async(email,password,done) => {
        try{

            //Find the user by email
            const user = await User.findOne({"local.email":email})
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

passport.use(
    'google',
    new GooglePlusTokenStrategy({
        clientID: GOOGLE_ClIENT_ID,
        clientSecret:GOOGLE_ClIENT_SECRET,
        // callbackURL:'/oauth/google/callback',
        // passReqToCallback   : true
        // authorizationURL: "/oauth/google"
    },
    async(accessToken,refreshToken,profile,done) => {
        try 
        {
            //Check if user exists in database
            //console.log(profile)
            const user = await User.findOne({"google.id": profile.id})
            console.log(user)

            if(user) return done(null,user)
            //If not then create a user in database
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            })
            await newUser.save()
            done(null,user)   
        }
        catch (error) {
            //return done(error,false,error.message)  
            done(null,error) 
        }

    }
))

passport.use(
    'facebook', 
    new FacebookTokenStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET
    },
    async (accessToken,refreshToken,profile,done) => {
     try {
        //check if user exist in database
        console.log(1)

        const user = await User.findOne({"facebook.id": profile.id})
        console.log(user)
        if(user) return done(null,user)
        //If user does not exist then create one
        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                
            }
        })
        await newUser.save()
        done(null, newUser)    
     }
     catch (error) {
       done(null,error)  
     }

    })
    )


