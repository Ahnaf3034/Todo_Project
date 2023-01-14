// Use For Todo operations
// Import Mongoose
const mongoose=require('mongoose');

// Create Data Schema
const DataSchema=mongoose.Schema({
    UserName:{type:String},  //User Name Type String and It must be Unique
    TodoSubject:{type:String},
    TodoList:{type:String},
    TodoDescription:{type:String},
    TodoStatus:{type:String,default:"New"},
    TodoCreateDate:{type:Date,default:Date.now},
    TodoUpdateDate:{type:Date,default:Date.now}
},{versionKey:false})

// Convert Schema To Model
const TodoListModel=mongoose.model('List',DataSchema) //Calling model() from mongoose and put CollectionName and SchemaName Into it

// Export Model
module.exports=TodoListModel;