// Importing express and creating a router
var express = require("express");
//Import the express router
var router = express.Router();
//Import axios to make http requests
var axios = require("axios");

//Import the Transaction model
var Transaction = require("../models/TransactionsModel");
//Import the User model
var Users = require("../models/UserModel");
//Import the EthereumPriceModel
let EthereumPriceModel = require("../models/EthereumPriceModel");

//Import the dotenv package to use environment variables
require("dotenv").config();

/*
  The router handles the /transactions/userAddress route
  It fetches the transaction data from etherscan and stores it in the database
  After that it updates the User Model to store the transaction ids as an array
  It then populated the user model transactions field with the transaction data
  And finally it sends the user data to the client
*/

router.get("/:userAddress", async function (req, res, next) {
	//Get the user address from the request
	let user_address = req.params.userAddress;
	try {
		let saved_user = await Users.find({ user_address: user_address });
		if (saved_user.length > 0) {
			//Get the user's previous transactions
			let user_transactions = saved_user[0].transactions;
			//Delete the user's previous transactions
			await Transaction.deleteMany({ _id: user_transactions });
		}

		//Get the transaction data from etherscan
		let transactionData = await axios.get(` 
    https://api.etherscan.io/api?module=account&action=txlist&address=${user_address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`);

		//Insert the transaction data into the database
		let transactions = await Transaction.insertMany(
			transactionData.data.result
		);

		//Get the user from the database
		let users = await Users.find({ user_address: user_address });
		//Create an array of transaction ids
		let transactionsIdField = [];
		//Loop through the transactions and push the transaction ids into the array
		for (let i = 0; i < transactions.length; i++) {
			transactionsIdField.push(transactions[i]._id);
		}

		//If the user doesn't exist, create a new user
		if (users.length == 0) {
			let newUser = new Users({
				user_address: user_address,
				transactions: [],
				account_balance: 0
			});

			await newUser.save();
			users.push(newUser);
		}

		//Update the user's transactions field with the array of transaction ids
		users[0].transactions = transactionsIdField;
		//Save the user
		await users[0].save();

		//Get the user from the database and populate the transactions field with the transaction data
		let response_users = await Users.find({
			user_address: user_address
		}).populate("transactions");
		//Send the user data to the client
		res.end(JSON.stringify(response_users));
	} catch (err) {
		//If there is an error, log it and send it to the next middleware
		console.log(err);
		next(err);
	}
});

// The router handles the /transactions/getBalance/userAddress route
// It fetches the current ethereum price from the database
// It then calculates the user's balance and sends it to the client

router.get("/getBalance/:userAddress", async function (req, res, next) {
	try {
		//Get the user address from the request
		let userAddress = req.params.userAddress;
		//Get the user from the database and populate the transactions field
		let trasaction = await Users.find({ user_address: userAddress }).populate(
			"transactions"
		);
		//Get the user's transactions
		let transactionData = trasaction[0].transactions;
		//Calculate the user's balance
		let balance = 0;
		/*
    Loop through the transactions and 
    add the value to the balance if the transaction is a deposit 
    and subtract the value if the transaction is a withdrawal
    */
		for (let i = 0; i < transactionData.length; i++) {
			if (transactionData[i].to == userAddress) {
				balance += parseInt(transactionData[i].value);
			} else {
				balance -= parseInt(transactionData[i].value);
			}
		}
		//Get the ethereum price from the database
		let ethereumPriceData = await EthereumPriceModel.find({});
		//Send the user's balance, ethereum price and currency to the client
		res.send({
			balance: balance,
			ethereumPrice: ethereumPriceData[0]?.price,
			currency: "INR"
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//Export the router
module.exports = router;
