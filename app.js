require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());//to convert the data to json format,otherwise we cant post data to the server from postman

const userRouter = require("./routes/api/users/user.router");
/*

app.get("/api", (req, res) => {
  res.send({
    success: 1,
    message: "An API for a simple note-taking app",
  });
});
*/
app.use("/api/users", userRouter);//to use the userRouter for the /api/users endpoint 
//This line tells Express to use the userRouter for any requests that start with the path "/api/users". 

//console.log(process.env);

app.listen(process.env.APP_PORT, () => {
  console.log("Server has started on port:", process.env.APP_PORT);
});

