// Use For User Registration, Profile Read & Update
// Import Mongoose
const mongoose=require('mongoose');

// Create Data Schema
const DataSchema=mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    ContactNo:{type:Number},
    Age:{type:Number},
    Email:{type:String},
    UserName:{type:String,unique:true},  //User Name Type String and It must be Unique
    Password:{type:String}
},{versionKey:false})

// Convert Schema To Model
const ProfileModel=mongoose.model('Profile',DataSchema) //Calling model() from mongoose and put CollectionName and SchemaName Into it

// Export Model
module.exports=ProfileModel;