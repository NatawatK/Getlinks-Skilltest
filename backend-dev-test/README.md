# Github followers


## Requirements

This project is require **NodeJs.** and **MongoDB** 
(you can download here https://nodejs.org/en/download/, https://docs.mongodb.com/v3.2/administration/install-community/)

## Installation

1. install Node.js
2. Clone this repository
3. Change directory to backend-dev-test
4. install and run the MongoDB instance
5. run following commands
```
   $ npm install
   $ npm start
   ```
6. The app will ready to use at [localhost:3000
](localhost:3000)
    
## API Documentation
**Register**
POST /user/register
``` 
request body : 
{
	"username" : "<username>",
	"password" : "<password>",
	"email" : "<email>", [optional]
	"fullname" : "<fullname>", [optional]
	"lastname" : "<lastname>" [optional]
}
```
```
Response:
if success response status code will be 201
```
    
   **Login**
   POST /user/login
   ``` 
request body : 
{
	"username" : "<username>",
	"password" : "<password>"
}
```
```
Response:
If success 
- status code 200
- json { message : "login success" }
If fail
- status code 401 (unauthorized)
```

