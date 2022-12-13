// Description: This file contains the code for the corn job that will run every 10 minutes to update the Ethereum price in the database
var cron = require("node-cron");
var axios = require("axios");
var EthereumPrice = require("./models/EthereumPriceModel");

// schedule a corn job to run the 'fetchEthereumPrice' function every 10 minutes
cron.schedule("*/10 * * * *", function () {
	fetchEthereumPrice();
});

// This is the function that will be run every 10 minutes by the corn job
async function fetchEthereumPrice() {
	try {
		// Get the Ethereum price from the CoinGecko API
		let ethPrice = await axios.get(
			"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr"
		);
		console.log(ethPrice.data.ethereum.inr);

		// Update the Ethereum price in the database
		EthereumPrice.findOneAndUpdate(
			{},
			{ $set: { price: ethPrice.data.ethereum.inr }, currency: "INR" },
			{ upsert: true, new: true }, //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one.
			function (err, doc) {
				if (err) {
					console.log("Something wrong when updating data!");
				}
				console.log(doc);
			}
		);
	} catch (err) {
		console.log(err);
	}
}
