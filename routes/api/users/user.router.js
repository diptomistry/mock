const{createUser,getUserByUserId,getUsers,updateUser,deleteUser,login}=require('./user.controller');
const router=require('express').Router();//to import the router object from the express package
const {checkToken}=require('../../auth/token_validation');//to import the checkToken method from the token_validation file
router.post('/',checkToken,createUser);//to create a new user
router.get('/',checkToken,getUsers);//to get all the users
router.get('/:id',checkToken,getUserByUserId);//to get a single user by id
router.patch('/',checkToken,updateUser);//to update a user
router.delete('/',checkToken,deleteUser);//to delete a user
router.post('/login',login);//to login a user
module.exports=router;//to export the router object