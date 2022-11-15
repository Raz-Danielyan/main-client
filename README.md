# Main Client

This is customizing Axios code witch will help you to forget about some messy and not understandable code. Tt's clean and easy working code ** and it will put the world in the better place:) **

## Props

- headers => headers is a prop for write headers in request, for example when you want to add Authorization,
- API_ROOT => it`a a base APi of your API. For example https://www.youtube.com/watch?v=a8CwpGARAsQ this is whole API and https://www.youtube.com is base API,
- routes => It's routes of object for your APP navigate. if you don`t have object with your routes you can just put.

```javascript
{
  notFound: {
    pathname: `your path to not found page`;
  }
}
```

I add this for future changes if you have any suggestion I`m free to talk,

- getAccessToken => getAccessToken is a function for getting the Authorization token,
- emptyState => emptyState is a function for clean your state, it`s working when you getting 401 error,

## Usage

this is a basic example how you can configure your main-client, you should have installed antD and axios

```javascript
import MainClient from "main-client";

const API_ROOT = "https://www.youtube.com";

const routes = {
  notFound: {
    pathname: `/not not-found`,
  },
};

export const emptyState = () => {
  localStorage.removeItem("user");
};

export const getAccessToken = () => {
  const state = loadState();
  return (state && state.jwt) || "";
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (headers = {}) => {
  return MainClient({ headers, API_ROOT, routes, getAccessToken, emptyState });
};
```
