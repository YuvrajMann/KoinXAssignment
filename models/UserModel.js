// Description: This file contains the schema for the User model
// The user model is used to store the user's address, account balance and transactions

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//The user schema
//The user_address field is used to store the user's address
//The account_balance field is used to store the user's account balance
//The transactions field is used to store the user's transactions
//The transactions field is an array of transaction ids
//The ref property is used to specify the model that the transaction id belongs to

var userSchema = new Schema({
	user_address: { type: String, required: true },
	account_balance: { type: Number, required: false },
	transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
});

// Export the model
module.exports = mongoose.model("User", userSchema);
