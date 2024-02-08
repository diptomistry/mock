require("dotenv").config();
const express = require("express");
const app = express();
const cors=require("cors");
app.use(express.json());//to convert the data to json format,otherwise we cant post data to the server from postman
app.use(cors());//to allow the client to access the server
const userRouter = require("./routes/api/users/user.router");
const pool = require("./routes/database");



app.use("/api/users", userRouter);//to use the userRouter for the /api/users endpoint 
//This line tells Express to use the userRouter for any requests that start with the path "/api/users". 

//console.log(process.env);

app.post('/api/users/signup', (req, res) => {
  const sql='INSERT INTO login (name,email,password) VALUES (?)';
  const values=[
    req.body.name,
    req.body.email,
    req.body.password
  ]
  pool.query(sql,[values],(err,data)=>{
    if(err){
      return res.json("Error");
    }
    else{
      return res.json(data);
    }
  });
});
app.post('/api/users/loginn', (req, res) => {
  const sql='SELECT * FROM login WHERE email=? AND password=?';
 
  pool.query(sql,[req.body.email,req.body.password],(err,data)=>{
    if(err){
      return res.json("Error");
    }
    if(data.length>0){
      return res.json("Success");
    }
    else{
      return res.json('Failed to login');
    }
  });
});
app.listen(process.env.APP_PORT, () => {
  console.log("Server has started on port:", process.env.APP_PORT);
});

