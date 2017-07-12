# express_api_boilerplate
Express, MySQL, Bcrypt, JWT


Make sure you have MySQL set up on you machine. A sql file has been provided for a simple user table


npm install


Configure your database in './utils/database_utils/database_connection.js' 

```javascript
//Initial routes:
    // Add a new user to the system
    POST: /api/create-new-user
        {
            "email": "hello@goodbye.com",
            "password": "password"
        }
        
    // Authenticates and returns a JWT (access-token)
    POST: /api/authenticate
        {
            "email": "hello@goodbye.com",
            "password": "password"
        }
        
     // Authenticated route. Requires 'access-token' header to be set   
     GET: /api/some-other-route
```
