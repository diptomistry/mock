const {create,getUser,getUserByUserId,updateUser,deleteUser,getUserByUserEmail}=require('./user.service');
const{genSaltSync,hashSync,compareSync}=require('bcrypt');//to import the genSaltSync and hashSync methods from the bcrypt package
//comparesync is used to compare the password entered by the user with the password in the database
const { sign } = require('jsonwebtoken');//to import the sign method from the jsonwebtoken package
module.exports = {
    createUser:(req,res)=>{
        const body=req.body;//to get the data from the request body
        const salt=genSaltSync(10);//to generate a salt for the password (even if two users have the same pass their hash will be different)
        body.password=hashSync(body.password,salt);//to hash the password (to secure the password)
        create(body,(err,results)=>{//to call the create method from the user.service file
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({//if no error occurs, return the results to the client
                success:1,
                data:results
            });
        });
    },
    getUserByUserId:(req,res)=>{
        const id=req.params.id;//to get the id from the request parameters//will give the id that is passed in the url
        getUserByUserId(id,(err,results)=>{//to call the getUserByUserId method from the user.service file
            if(err){
                console.log(err);
                return;
            }
            if(!results){//if no result is found//null or undefined
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getUsers:(req,res)=>{
        getUser((err,results)=>{//to call the getUser method from the user.service file
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    updateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);//encrypt the password
        updateUser(body,(err,results)=>{//to call the updateUser method from the user.service file
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"failed to update user"
                });
            }
            return res.json({
                success:1,
                message:"updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id; // Retrieve id from URL parameters
        deleteUser({ id }, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
  
    login:(req,res)=>{
        const body=req.body;//to get the data from the request body
       // console.log(body);
        getUserByUserEmail(body.email,(err,results)=>{//to call the getUserByUserEmail method from the user.service file
            if(err){
                console.log(err);
            }
            if(!results){//if no result is found
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
            //console.log(results);
           
            const result=compareSync(body.password,results.password);//to compare the password entered by the user with the password in the database
            if(result){
                results.password=undefined;//to hide the password from the user
                const jsontoken=sign({result:results},process.env.SECRET_KEY,{expiresIn:"1h"});//to create a token
                return res.json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                });
            }
            else{
                return res.json({
                    success:0,
                    data:"Invalid email or password"
                });
            }
        });
    },
    


};//to export createUser method