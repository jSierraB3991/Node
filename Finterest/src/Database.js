const mysql = require('mysql');

const mysqlconect = mysql.createConnection({
    host: process.env.SERVER_DB,
    user: process.env.USER_NAME_DB,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE_NAME
});
mysqlconect.connect(function(error){
    if(error){
        console.log('error: ', error);
        return;
    }else{
        console.log('DB IS CONEECTED');
    }
});

module.exports = mysqlconect;