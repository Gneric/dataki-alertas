const { HOST, PORT, USER, PWD, DB, MULTIPLESTATEMENTS } = require('./Config/mySQLConfig')

var mysql = require('mysql');






function getAllTypes(){
    var response;
    var connection = mysql.createConnection({host:HOST,user:USER,password:PWD});
    connection.connect();
    connection.query('SELECT * FROM types', function(err, rows, fields) {
        if (err) throw err;
        response = rows[0].solution
      });
    connection.end();
}

function getAllMediums(){
    
}

function getDefaultPackages(){
    
}

function getDefaultTriggers(){
    
}

function createEvent(name, type, trigger, recipients, blockPackage, creator, created_At, updated_At){
    
}

function createEventMediums(mediums){
    
}

module.exports = {
    getAllTypes, getAllMediums, getDefaultPackages, getDefaultTriggers, createEvent, createEventMediums
}