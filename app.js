require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/api/users/user.router");
app.use(express.json());//to convert the data to json format,otherwise we cant post data to the server from postman
/*

app.get("/api", (req, res) => {
  res.send({
    success: 1,
    message: "An API for a simple note-taking app",
  });
});
*/
app.use("/api/users", userRouter);

//console.log(process.env);

app.listen(process.env.APP_PORT, () => {
  console.log("Server has started on port:", process.env.APP_PORT);
});

