// Description: This file contains the schema for the transactions collection in the database
var mongoose = require("mongoose");
// Get the mongoose schema
var Schema = mongoose.Schema;
/* 
    Define the schema
    The required property is used to make sure that the field is not empty
    The type property is used to specify the type of the field
*/

var transactionSchema = new Schema({
	blockNumber: { type: Number, required: true },
	timeStamp: { type: Number, required: true },
	hash: { type: String, required: true },
	nonce: { type: Number, required: true },
	blockHash: { type: String, required: true },
	transactionIndex: { type: Number, required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	value: { type: Number, required: true },
	gas: { type: Number, required: true },
	gasPrice: { type: Number, required: true },
	isError: { type: Number, required: false },
	txreceipt_status: { type: Number, required: false },
	input: { type: String, required: false },
	contractAddress: { type: String, required: false },
	cumulativeGasUsed: { type: Number, required: false },
	gasUsed: { type: Number, required: false },
	confirmations: { type: Number, required: false },
	methodId: { type: String, required: false },
	functionName: { type: String, required: false }
});

//Create an index on the hash field
transactionSchema.index({ hash: 1 }, { unique: true });

//Export the model
//The first parameter is the name of the model
//The second parameter is the schema
module.exports = mongoose.model("Transaction", transactionSchema);
