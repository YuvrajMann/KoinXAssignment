# KoinXAssignment
To develop a Server Side Application to fetch Crypto Transactions of a user <br>
Developed By - Yuvraj Mann (Enginnering Student @UIET PU

## Routes Developed :-
```
GET /transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d HTTP/1.1
Host: localhost:3000

RESPONSE : {
  [
    {
        "_id": "6398b26d7eab277fb7dc38d3",
        "user_address": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
        "account_balance": 0,
        "transactions": [
           ................
               {
                "_id": "6398b4407a48b0ca02bc1605",
                "blockNumber": 14609155,
                "timeStamp": 1650284543,
                "hash": "0x25f745fc71d9ddd0db561d06a023e6c654089861dc4625cdc81743afd3228982",
                "nonce": 112207,
                "blockHash": "0xa48498a87afc3714f3e6edce2fd3344ddbdb85e77eaf85bed3afa60f879616e1",
                "transactionIndex": 220,
                "from": "0xf598b81ef8c7b52a7f2a89253436e72ec6dc871f",
                "to": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
                "value": 10003420000000000,
                "gas": 105000,
                "gasPrice": 29489937413,
                "isError": 0,
                "txreceipt_status": 1,
                "input": "0x",
                "contractAddress": "",
                "cumulativeGasUsed": 14067378,
                "gasUsed": 21000,
                "confirmations": 1568068,
                "methodId": "0x",
                "functionName": "",
                "__v": 0
            },
           ..............
        ]
        "__v": 3
    }
] }

-------------------------------------------------------------------------------------------------

GET /transactions/getBalance/0xce94e5621a5f7068253c42558c147480f38b5e0d HTTP/1.1
Host: localhost:3000

RESPONSE : {
    "balance": 23661628529389250,
    "ethereumPrice": 108968,
    "currency": "INR"
}

```

## CRON (Command Run On (UNIX scheduler) Job
A cron job that will run every 10 minutes to update the Ethereum price in the database is developed

## Setup Instructions 
1. Clone the repository in your local PC using ```git clone https://github.com/YuvrajMann/KoinXAssignment.git```
2. Run the command ```npm install``` to install all the node_modules
3. Create a file name ```.env``` as
  ```
  ETHER_API_KEY=7AIHHBBX1FT2SITMJV3FKA7KJS69SH43dw
  MONGO_URL=mongodb://127.0.0.1:27017/koinx
  ```
4. Run the server using ```npm start``` command

## Other Tasks
1. Deployed mongoDb database to Free Tier Shared Mongo Atlas cloud database at - mongodb+srv://yuvraj:encyclopedi@cluster0.4imevyc.mongodb.net/koinx?retryWrites=true&w=majority
2. Deplyed the app using at - <a>https://uninterested-tan-dibbler.cyclic.app/transactions/</a>

## Coding Standard 
1. Eslinters along with husky-pre commit setted up
2. Eslinter configured with following rules 
 ```
  "rules": {
        "no-console":1,                   
        "comma-dangle": 1,               
        "quotes":2,
        "Linebreak-style":0,      
        "no-unused-vars": 0,             
        "max-len": 0
  }
```
3. Prettier is also configured with husky
