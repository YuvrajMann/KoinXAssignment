// Description: This file contains the schema for the EthereumPrice model
// The EthereumPrice model is used to store the price of Ethereum

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//The EthereumPrice schema
//The price field is used to store the price of Ethereum in INR
//The currency field is used to store the currency of the price
var ethereumPriceSchema = new Schema({
	price: { type: Number, required: true },
	currency: { type: String, dsarequired: true }
});

// Export the model
module.exports = mongoose.model("EthereumPrice", ethereumPriceSchema);
