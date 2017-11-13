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
  start();
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
			message: "Please type in the Item ID you want to purchase..."
		},
		{
			name: 'quantity',
			type: 'input',
			message: "Please type the amount of units of this item you would like to purchase..."
		}
	]).then(function(answer) {
		var itemID = parseInt((answer.id) - 1);
		var howMany = parseInt(answer.quantity);
		updateDatabase(itemID, howMany);
	});
};

function updateDatabase(itemID, howMany) {
		connection.query('SELECT * FROM products WHERE item_id = ' + itemID, function(err, res) {
			if (itemID.stock_quantity >= howMany) {
				var totalCost = howMany * itemID.price;
				console.log("Total cost for " + itemID.item_id + " is " + totalCost);
				connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + howMany + ' WHERE item_id = ' + itemID);
			} else {
				console.log("We only have " + itemID.stock_quantity + " of " + itemID.item_id + " left.");
			} 
			start();
		})
}