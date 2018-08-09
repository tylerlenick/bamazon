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
    displayAll();
    
});

function displayAll() {

    connection.query("SELECT item_id, product_name, price FROM products ORDER BY item_id", (err, result) => {
        if (err) throw err
        const table = new Table({
            head: ['ID', 'Item Name', 'Price'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });

        for (let i = 0; i < result.length; i++) {
            table.push([result[i].item_id, result[i].product_name,"$" + result[i].price]);
        };
        console.log("\n")
        console.log(table.toString());
        buyPrompt();
    });
};

function buyPrompt() {

    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Select ID of item you wish to buy"
        }, 
        {
            type: 'input',
            name: 'amt',
            message: 'How many would you like to buy?'
        }
    ]).then(response => {
        let userItem = response.item;
        let userAmt = parseInt(response.amt);

     
        connection.query("SELECT stock_quantity, price, product_sales FROM products WHERE item_id = ?", userItem, (err, result) => {
            if (err) throw err;
            let dbStock = result[0].stock_quantity;
            let itemPrice = result[0].price;
            let totalSales = result[0].product_sales;
            
            if (dbStock < userAmt) {
                console.log("Not enough stock...");
                buyPrompt();
            } else {
                let newStock = dbStock - userAmt;
                let userCost = itemPrice * userAmt;
                totalSales += userCost;
                connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?", [newStock, totalSales, userItem], (err,result) => {
                    if (err) throw err
                    console.log("Your total comes to $" + userCost);
                    connection.end();
                });
            };
        });
        
    });
    
};