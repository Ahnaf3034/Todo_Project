// Use for To-do CRUD, Mark, Filter Operations
// Import TodoListModel
const TodoListModel=require("../models/TodoListModel");


//Create Create Todo Function
exports.CreateTodo=(req,res)=>{
    let reqBody=req.body; //Read Data from Request Body
    let TodoSubject=reqBody['TodoSubject']; //Get todo subject from request body 
    let TodoDescription=reqBody['TodoDescription']; //Get todo Description from request body 
    let TodoStatus="New"; //Todo Status By default "New"
    let TodoCreatedate=Date.now();  //Todo Create Date
    let TodoUpdatedate=Date.now();

    let UserName=req.headers['UserName']; //Get UserName from Request Header

    let PostBody={
        UserName:UserName,
        TodoCreatedate:TodoCreatedate,
        TodoDescription:TodoDescription,
        TodoSubject:TodoSubject,
        TodoStatus:TodoStatus,
        TodoUpdatedate:TodoUpdatedate
    }

    //CreateTodo Using TodoListModel
    TodoListModel.create(PostBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"Failed",data:"Please Solve this: "+error})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

// Create Select/Read To do function
exports.SelectTodo=(req,res)=>{
    let UserName=req.headers['UserName']; //Get UserName from Request Header

    //Find UserName from database for Read
    TodoListModel.find({UserName:UserName},(error,data)=>{   //Check UserName is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserName Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}

// Create Update Todo function
exports.UpdateTodo=(req,res)=>{

    let reqBody=req.body; //Read Data from Request Body
    let TodoSubject=req.body['TodoSubject'];  //get Todo Subject from Request Body
    let TodoDescription=req.body['TodoDescription']; //get To do Description from req. body
    let _id=req.body['_id'];
    let TodoUpdateDate=Date.now(); //Update Date

    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }

    //Find UserName from database and Update data
    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(error,data)=>{   //Check UserId is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserId Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}

// Create Update Status Todo function
exports.UpdateStatusTodo=(req,res)=>{

    let reqBody=req.body; //Read Data from Request Body
    let TodoStatus=req.body['TodoStatus'];  //get Todo Status from Request Body
    let _id=req.body['_id'];
    let TodoUpdateDate=Date.now(); //Update Date

    let PostBody={
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate
    }

    //Find UserName from database and Update Status
    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(error,data)=>{   //Check UserId is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserId Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}

// Create Remove Todo function
exports.RemoveTodo=(req,res)=>{

    
    let _id=req.body['_id'];


    //Find UserName from database and remove Todo
    TodoListModel.remove({_id:_id},(error,data)=>{   //Check UserId is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserId Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct delete todo
        }
    })
}

// Create Select To do By Status
exports.SelectTodoStatus=(req,res)=>{
    let UserName=req.headers['UserName']; //Get UserName from Request Header
    let TodoStatus=req.body['TodoStatus'];  //get Todo Status from Request Body

    //Find UserName from database for Read
    TodoListModel.find({UserName:UserName,TodoStatus:TodoStatus},(error,data)=>{   //Check UserName is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserName Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}

// Create Select To do By Date
exports.SelectTodoDate=(req,res)=>{
    let UserName=req.headers['UserName']; //Get UserName from Request Header
    let FromDate=req.body['FromDate'];  //get From Date from Request Body
    let ToDate=req.body['ToDate'];  

    //Find Date 
    TodoListModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}},(error,data)=>{   
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserName Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}