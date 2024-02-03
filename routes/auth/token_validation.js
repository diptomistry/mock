const{verify} = require('jsonwebtoken');//to import the verify method from the jsonwebtoken package
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");//to get the token from the header
        if (token) {//if token is found
            // Remove Bearer from string
            token = token.slice(7);//to remove the Bearer from the token string
            verify(token, process.env.SECRET_KEY, (err, decoded) => {//to verify the token
                if (err) {//if error occurs
                    res.json({
                        success: 0,
                        message: "Invalid Token"//return this message
                    });
                } else {//if no error occurs
                    next();//to call the next middleware
                }
            });
        } else {//if token is not found
            res.json({
                success: 0,
                message: "Access Denied! Unautorized User"//return this message
            });
        }
    }
}