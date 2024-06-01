# Phonebook Backend

[Link to Deployed Backend on Render](https://phonebook-backend-iuhk.onrender.com) [https://phonebook-backend-iuhk.onrender.com]

### 3.1 phonebook backend step1 ✅

Make a Node application that provides a hardcoded array of telephone number information at http://localhost:3001/api/persons :

### 3.2: phonebook backend step2 ✅

Make a page similar to the following for the application's address http://localhost:3001/info. The page should therefore tell the moment the request was made and how many phonebook data are in the table in the application's memory.

### 3.3: phonebook backend step3 ✅

Implement functionality to display individual phone number information. For example, the url of the number data with id 5 is http://localhost:3001/api/persons/5

If there is no phone number information corresponding to the id, the server must respond with an appropriate status code.

### 3.4: phonebook backend step4 ✅

Implement functionality that makes it possible to delete phone number data with an HTTP DELETE request to the URL that identifies the number data.

Test the functionality with Postman or Visual Studio Code's REST client.

### 3.5: phonebook backend step5 ✅

Extend the backend in such a way that it is possible to add new phone information to the address http://localhost:3001/api/persons with an HTTP POST request.

Generate the identifier of the new telephone data with the function Math.random . Use a large enough range of values ​​so that the id drawn is likely to be one that is not already in use.

### 3.6: phonebook backend step6 ✅

Make error handling for adding a new number. The request must not succeed if

name or number missing
the name to be added is already in the list
Reply with the relevant status code and also include information that tells the reason for the error, e.g.:

```
{ error: 'name must be unique' }
```

### 3.7: phonebook backend step7 ✅

Add the logging middleware Morgan to your application . Configure it to log to the console according to the tiny configuration.

### 3.8\*: phonebook backend step8 ✅

Configure Morgan to also display data accompanying HTTP POST requests:

### 3.9 phonebook backend step9 ✅

Make the backend work with the frontend of the phone book made in the previous part, except for the possible change of phone number, the corresponding functionality of which will be implemented in the backend only in task 3.17.

### 3.10 phonebook backend step10 ✅

Export the backend of the application to the Internet, e.g. to Fly.io or Render.

Make a file README.md at the root of the repository and add a link to your application on the Internet.:

### 3.11 phone book full stack ✅

Generate a production version of the frontend and add it to your application on the Internet following the method presented in this section.

NOTE: is n't the directory dist git-ignored in your project if you use Render?

Also make sure that the frontend still works locally.

In order for everything to work, your repository should look the same as the repository of the example application in terms of directory structure .
