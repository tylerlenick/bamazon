//Requiring NPM packages
var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

//Connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displaySuper();
    
});

function displaySuper() {
    inquirer.prompt([
        {
            type: "list",
            name: "superChoice",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]           
        }
    ]).then(response => {

        switch(response.superChoice) {

            case "View Product Sales by Department":
            console.log("working");

            case "Create New Department":
            console.log("working");
        };
    });
}