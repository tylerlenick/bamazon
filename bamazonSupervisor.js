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
            connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, (SELECT SUM(p.product_sales)) AS total_sales, (SELECT SUM(p.product_sales) - d.over_head_costs) AS total_profit FROM departments d LEFT JOIN products p ON d.department_name = p.department_name GROUP BY department_id;", (err,result) => {
                if (err) throw err;
                const table = new Table({
                    head: ['ID', 'Department', 'Over Head Costs', 'Product Sales', 'Total Profits'],
                    style: {
                        head: ['blue'],
                        compact: false,
                        colAligns: ['center'],
                    }
                });

                for (let i = 0; i < result.length; i++) {
                    table.push([result[i].department_id, result[i].department_name,"$" + result[i].over_head_costs, "$" + result[i].total_sales, "$" + result[i].total_profit]);
                };
                console.log("\n")
                console.log(table.toString());
                displaySuper();
            });
            break;
            
            case "Create New Department":
            newDept();
            break;
            
        };
    });
};

function newDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept",
            message: "What is the name of the new department?"
        }, 
        {
            type: "input",
            name: "cost",
            message: "What is the over head cost?"
        }, 
        
    ]).then(response => {

        let newDept = response.dept;
        let newCost = response.cost;
        
        connection.query("INSERT INTO departments(department_name,over_head_costs) VALUES (?, ?)", [newDept, newCost], (err,result) => {
            if (err) throw err 
            console.log("New department '" + newDept + "' has been added");
            displaySuper();
        });
    });
};