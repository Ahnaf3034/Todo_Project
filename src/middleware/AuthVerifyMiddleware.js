// Use For Login Authentication
// Import JWT
const jwt=require('jsonwebtoken')

//Create Middleware and Export it
module.exports=(req,res,next)=>{
    let token=req.headers['token-key'] //get token key from request header

    //Verify token and Secret key
    jwt.verify(token,'Sec123456Ret',(error,decoded)=>{
        if(error){
            res.status(401).json({status:"Failed",data:"Unauthorized"}) //If error 
        }
        else{

            //Get User Name from Decoded Token
            let UserName=decoded['data']['UserName']
            //Add UserName With Request Header
            req.headers.UserName=UserName;


            next(); // If success go to the next step 
        }
    })
}