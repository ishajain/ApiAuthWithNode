import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema } = mongoose
//Create a schema
const userSchema = new Schema({
    method: { type: String, enum: ['local','google','facebook']},
    local: {
        email: { type: String,lowercase:true},
        password : {type : String}
    },
    google: {
        id: {type: String},
        email: { type: String,lowercase:true},
    },
    facebook: {
        id: {type: String},
        email: { type: String,lowercase:true},
    }
})

//Run this method before pre save the data in the db
userSchema.pre('save', async function(next){
   try 
   {
        if(this.method === 'local') {
            console.log("Test",this.local.password)
            const salt = await bcrypt.genSalt(10) //Generate Salt
            const hashedPassword = await bcrypt.hash(this.local.password,salt) //Generare hash password with salt
            this.local.password = hashedPassword // reassign the password to hashpassword to save in the database.
        }
        next()
   } catch (error) 
   {
       next(error)
   }
    
})

userSchema.methods.isValidPassword = async function(passwordToValidate){ // we are not using fat arrow function because we want to you this keyword
    try 
    {
        return await  bcrypt.compare(passwordToValidate,this.local.password)
    } catch (error) {
        throw new Error(error)
    }
}


//Create a model
const User =  mongoose.model('user',userSchema)
//Export a model
module.exports = User