const mysql = require('mysql');
const inquirer = require('inquirer');

//connect to mysql db
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

//database connection
connection.connect(function(err) {
  if (err) throw err;
});

function start() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		console.log("Bamazon Inventory");
		for (var i = 0; i < res.length; i++) {
			var itemInfo = "Item ID: " + res[i].item_id + '\n Product Name: ' + res[i].product_name + '\n Department: ' + res[i].department_name + '\n Price: ' + res[i].price + '\n Quantity: ' + res[i].stock_quantity;
			console.log(itemInfo);
		}
		promptCustomerPurchase();
	}); 
};

function promptCustomerPurchase() {
	inquirer.prompt([
		{
			name: 'id',
			type: 'input',
			message: 'Please type in the Item ID you want to purchase...'
		},
		{
			name: 'quantity',
			type: 'input',
			message: 'Please type the amount of units of this item you would like to purchase...'
		}
	]).then(function(answer) {
		var itemID = parseInt((answer.id) - 1);
		var howMany = parseInt(answer.quantity);
		var totalPrice = parseFloat((howMany * res[itemID].price).toFixed(2));
		var updateQuery = "UPDATE products SET ? WHERE ?";

		if (res[itemID].stock_quantity >= howMany) {
			connection.query(updateQuery, 
			[
				{
					stock_quantity: parseInt(res[itemID].stock_quantity) - parseInt(answer.quantity)
				},
				{
					item_id: answer.id
				}	
				
			], function(err, res) {
				if (err) throw err;
				start();
			})

		} else {
			console.log("Insufficient quantity. Bamazon only has " + res[itemID].stock_quantity " of" + answer.id + ".");
			start();
		}
	})
};