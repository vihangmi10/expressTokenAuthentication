# JWT Token Based Authentication using Express

### Node Version 
```v12.8.1 ```  

### Libraries used 
1. JSON WEB TOKEN 
2. BCrypt 
3. Mocha
4. Chai 

## Understanding the application 
This application lets user register, login and on success will send an authentication token. The user is stored locally it is NOT a persistent store. So, if the application is closed then all the user's data will be lost. It also contains a webhook that can be attached to any third party service that can send updated stocks information. Stock information is also store locally and without using any persistent storage. In order for a user to get stock information from the server the user must set the authentication token header while making the request else the application will throw a error. This is just an example on how to authenticate users using JWT token and how to verify if the user is authenticated before sharing any data.

## Instrucutions to start the app 
1. Clone the project 
2. Install the dependencies ```npm install```  
3. To start the application ```npm start```
4. The server starts up at port 3000
5. To test the application ```npm test```


## API DETAILS 
1. Register user

Endpoint:  ```/register```  
HTTP REQUEST TYPE: ```POST```  
HTTP BODY REQUEST TYPE: ```application/json```  
HTTP BODY ```{ "username" : "admin123", "password" : "1234" }```

RESPONSES:
On success   
Status: ```200```  
RESPONSE TYPE: ```application/json```  
RESPONSE BODY: ```{ token: "string of token" }```

On ERROR: 
Status: ```401```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```Missing credentials to register please add username and password```

Status: ```409```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```Username already exists please pick another username```

2.Login  User 

Endpoint:  ```/login```  
HTTP REQUEST TYPE: ```POST```  
HTTP BODY REQUEST TYPE: ```application/json```  
HTTP BODY ```{ "username" : "admin123", "password" : "1234" }```

RESPONSES:
On success   
Status: ```200```  
RESPONSE TYPE: ```application/json```  
RESPONSE BODY: ```{ message: "Authorized username and password", token: "string of token" }```

On ERROR: 
Status: ```401```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```Invalid Password please check your password```

Status: ```403```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```Username does not exists```  
  
    
3.Stock hook to get stock information from 3rd party api  
Endpoint:  ```/getStocksHook```  
HTTP REQUEST TYPE: ```POST```  
HTTP BODY REQUEST TYPE: ```application/json```  
HTTP BODY ```{
	"ticker": "GOOG",
	"price": 1400
}```  

On success   
Status: ```200```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```OK```  
  
  4.Get stock information (Only for authenticated users)
  If the stock information for a stock ticker does not have 10 recent prices then the response will send a message 
  ```Since the recent prices are less than 10 the average will not be accurate```
  If there are more than 10 prices the average algorithm will pick the most recent 10 stock prices and will get an average of them and return with a message  
  ```We have sufficient data to predict accurate average```
  
Endpoint:  ```/getStockInformation```  
HTTP REQUEST TYPE: ```GET```  
HTTP BODY REQUEST HEADER: ```Authorization Bearer {token}```  
QUERY PARAM: ```?ticker={stock ticker symbol```

On success If stock prices for a request ticker symbol are less than 10   
Status: ```200```  
RESPONSE TYPE: ```application/json```  
RESPONSE BODY: ```{ message: "Since the recent prices are less than 10 the average will not be accurate", average: "average of most recent available stocks" }```

On success if the stock prices for a requested ticker symbol are greater than 10 it will pick the most recent 10 stock prices and will return 
Status: ```200```  
RESPONSE TYPE: ```application/json```  
RESPONSE BODY: ```{ message: "We have sufficient data to predict accurate average", average: "average of most recent 10 stock prices" }```

On Error 
Authentication fails 
Status: ```401```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```Invalid token```

Failing to provide query param ticker 
Status: ```500```  
RESPONSE TYPE: ```text/html```  
RESPONSE BODY: ```No stocks available for the given ticker symbol```
