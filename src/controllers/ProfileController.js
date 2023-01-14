// Use For Profile Read, Update and Registration
// Import ProfileModel
const ProfileModel=require("../models/ProfileModel");

// Import Json Web Token
const jwt=require('jsonwebtoken');

//Create Create Profile Function
exports.CreateProfile=(req,res)=>{
    let reqBody=req.body; //Read Data from Request Body

    //CreateProfile Using ProfileModel
    ProfileModel.create(reqBody,(error,data)=>{
        if(error){
            res.status(400).json({status:"Failed",data:"Please Solve this: "+error})
        }
        else{
            res.status(200).json({status:"Success",data:data})
        }
    })
}

//Create Log in Profile Function
exports.LoginProfile=(req,res)=>{
    let UserName=req.body['UserName']; //Get UserName from Request Body
    let Password=req.body['Password']; //Get Password from Request Body

    //Find UserName and Password from database by mongoose
    ProfileModel.find({UserName:UserName,Password:Password},(error,data)=>{  //Check UserName and Password are exist in database
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If any Error, show the error
        }
        else{
            if(data.length>0){

                // Create Json web Token before Response
                //Declare Payload
                let Payload={
                    exp:Math.floor(Date.now()/1000)+(24*60*60),  //Payload will expire after 24 hours
                    data:data[0]  //Show our data as payload
                }
                // create token
                let token=jwt.sign(Payload,'Sec123456Ret') //call sign from jwt and put Payload and a Secret Key Inside It
                
                
                res.status(200).json({status:"Success",data:data,token:token}) //If UserName and Password Matched and Data Length isn't 0 then Success and Show Data and Json web token
            }
            else{
                res.status(401).json({status:"Failed",data:"UserName or Password Incorrect"}) //If Error Then a Error Message
            }
        }
        
    })

}

// Create Select/Read Profile function
exports.SelectProfile=(req,res)=>{
    let UserName=req.headers['UserName']; //Get UserName from Request Header

    //Find UserName from database for Read
    ProfileModel.find({UserName:UserName},(error,data)=>{   //Check UserName is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserName Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}

// Create Update Profile function
exports.UpdateProfile=(req,res)=>{
    let UserName=req.headers['UserName']; //Get UserName from Request Header
    let reqBody=req.body; //Read Data from Request Body

    //Find UserName from database and Update data
    ProfileModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(error,data)=>{   //Check UserName is Correct or not
        if(error){
            res.status(400).json({status:"Failed",data:error}) //If UserName Not correct show the error message
        }
        else{
            res.status(200).json({status:"Success",data:data})  //If correct, show the data
        }
    })
}