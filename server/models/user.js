import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose
//Create a schema
const userSchema = new Schema({
    email: {
        type: String, required: true, unique: true
    }
    ,
    password : {
        type : String,
        required: true
    }
})

//Run this method before pre save the data in the db
userSchema.pre('save', async function(next){
   try 
   {
       //Generate Salt
    const salt = await bcrypt.genSalt(10)
        //Generare hash password with salt
    const hashedPassword = await bcrypt.hash(this.password,salt)
        // reassign the password to hashpassword to save in the database.
    this.password = hashedPassword
    next()
   } catch (error) {
       next(error)
   }
    
})

userSchema.methods.isValidPassword = async function(passwordToValidate){ // we are not using fat arrow function because we want to you this keyword
    try 
    {
        return await  bcrypt.compare(passwordToValidate,this.password)
    } catch (error) {
        throw new Error(error)
    }
}


//Create a model
const User =  mongoose.model('user',userSchema)
//Export a model
module.exports = User