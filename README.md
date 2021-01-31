# TypeScript Auth Server
 
## Features
* Typescript / Node Authorization API
* JWT Auth
* Password Hashing / Salting
* Koa Api Framework
* Multiple Environments
* Multithreaded on Production
* Ip Address Throttling
* SQLITE Db Backed
* Abstract Factory Design Pattern
 ---
## Steps For Local Usage
* Clone Repository, VsCode is the optimal setting for using the Launch.json
* Run `npm i` in the root of the project, this will install the needed dependencies. This will also run a postinstall script to build the project in a /build folder
* Add a `.env` file in the root of the project with the following key / values
* Because a `database.sqlite` will not exist on the firs run, `DB_SYNCHRONIZE` should be set to true for at least the first time
* `DB_TYPE` and `DB_NAME` must be set as below to use the sqlite driver
```
PORT=<number> // if not defined, defaults to 3000
DB_TYPE=sqlite // mandatory
DB_NAME=database.sqlite // mandatory
JWT_SECRET=<string> // this can be anything
DB_SYNCHRONIZE=<boolean> // true will migrate new tables into the db
NODE_ENV=<'development' | 'production'> // if not defined, defaults to 'development'
```
* `JWT_SECRET` can be any secret string that the json web token module uses for verification
* If you are in VsCode, you can use the `launch.json` files to run a server environment on either a DEV or PROD instance.
* if you are not in VsCode, you can set `NODE_ENV` in `.env` to either "production" or "development"
* The server running under production will use ip throttling to slow down too many requests made within a certain interval, it also uses clustering to spawn a number of worker threads equal to the amount of the cpu's logical cores. Development will have request logging, response time header, and SQL query logging all set to true. It also uses just a single worker thread.
* `npm run start` will start the server in /build if you are not using a `launch.json` configuration
 ---
## Server Functions
* By default, will run on port 3000.
* User data is returned in the form of a jsonwebtoken
* If you are VsCode, you can install the recommended extension "Rest Client" to use the request methods in local.dev/requests.http
* `POST http://localhost:3000/api/user/register` takes a body of
```
{
    "username": <string>,
    "email": <string>,
    "password": <string>
}
```
* The method will check if the username / email is taken. If not, it will hash the password, and add the user to the sqlite db. 
* The server then signs the id, and username fields of the new entry, and returns it in the form of a json web token. This token has a default expiration of 1 minute. This can be changed in src/helpers/config.ts on key `JWT_EXPIRATION`
* `POST http://localhost:3000/api/utility/validate` takes a header of
```
Authorization: Bearer <string> // jsonwebtoken
```
* This method will take the previously signed jsonwebtoken and return the decrypted data.
* `POST http://localhost:3000/api/user/login` takes a body of
```
{
    "username": <string>,
    "password": <string>
}
```
* This route will check if the user exists, and then check the plaintext password and check it against the hash saved in the database using the same hashing algorithm.
* A successful request made on this route will also return a signed jwt.
* By default, most things get logged into a file `combined.log` and `error.log` in the root of the project.
---
## Sources
* typescript https://github.com/microsoft/TypeScript
* bcrypt https://github.com/kelektiv/node.bcrypt.js#readme
* cluster https://nodejs.org/api/cluster.html
* dateformat https://github.com/felixge/node-dateformat
* dotenv https://github.com/motdotla/dotenv
* jsonwebtoken https://github.com/auth0/node-jsonwebtoken
* koa https://koajs.com/
* koa-bodyparser https://github.com/koajs/bodyparser
* koa-helmet https://github.com/venables/koa-helmet
* koa-json https://github.com/koajs/json
* koa-logger https://github.com/koajs/logger
* koa-response-time https://github.com/koajs/response-time
* koa-router https://github.com/koajs/router
* koa2-ratelimit https://github.com/ysocorp/koa2-ratelimit
* reflect-metadata https://github.com/rbuckton/reflect-metadata
* sqlite3 https://github.com/mapbox/node-sqlite3
* typeorm https://github.com/typeorm/typeorm
* winston https://github.com/winstonjs/winston
* husky https://github.com/typicode/husky
* eslint https://github.com/eslint/eslint