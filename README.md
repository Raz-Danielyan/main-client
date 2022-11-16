# Main Client

This customizing Axios code will help you forget messy and not understandable code. It's clean and easy-working code ** and it will make the world a better place:) **

## Props

- headers => headers is a prop for writing headers in the request, for example when you want to add Authorization in your request header,
- statusHandler => It`s object with functions for error response statuses, for example in 404 error you should have a object

```javascript
{
  on404: () => {
    // do something when 404 error occurs.
  };
}
```

as you already understand it's understood from the object name the error status and the function will work only in that status always, it's should starts with ** on ** and the default error responding key is "defaultErrHandler".

- accessToken => accessToken is a string for getting the Authorization token,
- type => the type is an array to get the user API, for example, if the type is ['update'], it will return only the Promise function to update the backend. by default it will return all methods. And options are (getMany, getOne, update, add, delete).

## Usage

- API_ROOT => It's a base API of your API. For example https://www.youtube.com/watch?v=a8CwpGARAsQ this is whole API and https://www.youtube.com is base API, and you should add API_ROOT in your `.env` file,
- Provider => Provider helps you to customize your API, and after initialization of the Provider you can add an endpoint.

this is a basic example how you can configure your main-client

```javascript
import APIProvider from "main-client";

const accessToken = 'qwe123';

const statusHandler={
  on404:()=>{
    //  do something when 404 error occurs.
  }
  defaultErrHandler:()=>{
    //  do something when error occurs.
  }
}

const type = ['getMany','update'];

const headers = {
  isAdmin: 'true'
};

const provider = APIProvider({ headers, accessToken, statusHandler });

const [fetchAllUnitsApi, updateUnitApi] = provider('units', type);
```
