const pool=require('../../database');//import the pool object from the database file
module.exports = {//to export create method
    create: (data, callBack) => {
        pool.query(//data
        `insert into registration(firstName, lastName,gender,email,password,number)
            values(?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {//callback function
                if (error) {
                    return callBack(error);//if error occurs, return the error to the callback function 
                }
                return callBack(null, results);//if no error occurs, return the results of the query to the callback function 
            }
        );
},
getUser: callBack => {//to get all the users
    pool.query(
        `select id,firstName,lastName,gender,email,number from registration`,
        [],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
    },
getUserByUserId: (id, callBack) => {//to get a single user by id
    pool.query(
        `select id,firstName,lastName,gender,email,number from registration where id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);//if no error occurs, return the first element of the results array to the callback function as we need only one result at a time
        }
    )
},
updateUser: (data, callBack) => {
    pool.query(
        `update registration set firstName=?, lastName=?,gender=?,email=?,password=?,number=? where id = ?`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
},
deleteUser: (data, callBack) => {
    pool.query(
        `delete from registration where id = ?`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    )
},
getUserByUserEmail: (email, callBack) => {
    pool.query(
        `select * from registration where email = ?`,
        [email],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        }
    )
}




};