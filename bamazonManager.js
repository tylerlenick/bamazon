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
    menuPrompt();
    
});

function menuPrompt() {

    inquirer.prompt([
        {
            type: "list",
            name: "firstChoice",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]           
        }
    ]).then(response => {

        switch(response.firstChoice) {

            case "View Products for Sale":
            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products ORDER BY item_id", (err, result) => {
                if (err) throw err
                const table = new Table({
                    head: ['ID', 'Item Name', 'Price', 'Quantity'],
                    style: {
                        head: ['blue'],
                        compact: false,
                        colAligns: ['center'],
                    }
                });
        
                for (let i = 0; i < result.length; i++) {
                    table.push([result[i].item_id, result[i].product_name,"$" + result[i].price, result[i].stock_quantity]);
                };
                console.log("\n")
                console.log(table.toString());
                menuPrompt();
                
            });
            break;

            case "View Low Inventory":
            connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", (err, result) => {
                if (err) throw err
                const table = new Table({
                    head: ['ID', 'Item Name', 'Quantity'],
                    style: {
                        head: ['blue'],
                        compact: false,
                        colAligns: ['center'],
                    }
                });

                for (let i = 0; i < result.length; i++) {
                    table.push([result[i].item_id, result[i].product_name, result[i].stock_quantity]);
                };
                console.log("\n");
                console.log(table.toString());
                menuPrompt();
            });
            break;

            case "Add to Inventory":
            connection.query("SELECT item_id, product_name, price, stock_quantity FROM products ORDER BY item_id", (err, result) => {
                if (err) throw err
                const table = new Table({
                    head: ['ID', 'Item Name', 'Price', 'Quantity'],
                    style: {
                        head: ['blue'],
                        compact: false,
                        colAligns: ['center'],
                    }
                });
        
                for (let i = 0; i < result.length; i++) {
                    table.push([result[i].item_id, result[i].product_name,"$" + result[i].price, result[i].stock_quantity]);
                };
                console.log("\n")
                console.log(table.toString());
                AddPrompt();
            });
            break;

            case "Add New Product":
            newProduct();


        };
            
    });

};

function AddPrompt() {

    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Select ID of item you wish to add to."
        }, 
        {
            type: 'input',
            name: 'amt',
            message: 'How many would you like to add?',
        }
    ]).then(response => {
        let userItem = response.item;
        let userAmt = parseInt(response.amt);

     
        connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", userItem, (err, result) => {
            if (err) throw err;
            let dbStock = result[0].stock_quantity;
            let itemPrice = result[0].price;
            
          
            let newStock = parseInt(dbStock) + parseInt(userAmt);
           
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, userItem], (err,result) => {
                    if (err) throw err
                    console.log("The new stock for that item is " + newStock);
                    menuPrompt();
                });
        });
    });
        
};

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "What is the name of the new product?"
        }, 
        {
            type: "input",
            name: "dept",
            message: "Which department will this product be in?"
        }, 
        {
            type: "input",
            name: "cost",
            message: "What is the price of this new item?"
        }, 
        {
            type: 'input',
            name: 'amt',
            message: 'How many would you like to add?',
        }
    ]).then(response => {

        let newItem = response.item;
        let newDept = response.dept;
        let newCost = response.cost;
        let newAmt = response.amt;

        connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [newItem, newDept, newCost, newAmt], (err,result) => {
            if (err) throw err 
            console.log("New item '" + newItem + "' has been added");
            menuPrompt();
        });
    });
};
