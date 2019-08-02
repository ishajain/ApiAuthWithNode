import express from 'express'
import UsersController from '../controllers/users'
//const router = express.Router() // Instead of this will use express-promise-router which will help us to give try catch block
import Router from 'express-promise-router'
import { validateBody , schemas } from '../helpers/routeHelpers'
import passport from 'passport'
import passportConfiguration from '../passport'
const router = Router()
router.route("/signup").post(validateBody(schemas.authSchema),UsersController.signUp)
router.route("/signin").post(passport.authenticate('local',{ session : false }),UsersController.signIn)
router.route("/secret").get(passport.authenticate('jwt',{ session : false }),UsersController.secret)
router.route("/oauth/google").post(passport.authenticate('google',{ session : false , scope: ["profile","email"] }),UsersController.googleOAuthsignIn)

module.exports = router