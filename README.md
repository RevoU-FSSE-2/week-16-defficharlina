

# REVOU ASSIGNMENT WEEK 16
This project is create an app use cors where client X, and client Y have different methods. Client X can GET, POST and client Y can GET, POST, UPDATE, DELETE 

## CORS

Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

## The Requirements
1. Have a login route and return. Access, refresh token and expire time
2. Must have a login session route and inject cookies access, refresh with max age expire of jwt
3. Logout and clearing cookies
4. Must have a request reset password and reset password route
5. Implement user roles in the app
6. Create route GET api/posts where user is reguler then return only that user data, if user is superuser then return all posts
7. Create / modify route. Set accept update and delete data that belong to spesific user
8. Create limitation in login requests. If login is fail 5 times return with bad response

## Skill Set
1. json web token
2. role based Authorization
3. express cookieparser
4. cookies understanding
5. express rate limiting
6. understanding cache and memory cache

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install cors
```

## Programming Language
JavaScript

JavaScript is a lightweight, cross-platform, single-threaded, and interpreted compiled programming language

## Development Process
1. Setup project with all required dependencies and i will use JavaScript
2. Create a simple frontend as a client, deploy project frontend with vercel
3. Create database book with table book name and author, next step deploy with MongoDB

#### Implement CORS


```sh
const origin = [
  "https://week15-defficharlina-fe.vercel.app",
  "https://week15-defficharlina.cyclic.app",
];
const partnerOrigin = [
  "https://week15.avicena.dev",
  "https://week-15-mnajmytsss.vercel.app",
];
```

#### Security Headers

Security headers are a group of headers in the HTTP response from a server that tell your browser how to behave when handling your site's content. For example, X-XSS-Protection is a header that Internet Explorer and Chrome respect to stop pages loading when they detect cross-site scripting (XSS) attacks.

  <p align="center">
    <img src="image/security headers.JPG" width="600">
  </p>

  ## Link Deploy

  **[Backend](https://week16-defficharlina.cyclic.app/)**