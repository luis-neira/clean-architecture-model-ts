# Clean Architecture Model TS

version: 'v2.0.0'

## Description
This is my attempt at creating a RESTful API implementing Uncle Bob Martin's clean architecture in TypeScript. I do not use any third pary packages for inversion of control, like InversifyJS. I use dependency injection in order to mantain a one-way flow of dependecy. I also use interfaces to satisfy Bob Martin's requirement of "use case ouput/input ports", which are then implemented by their use cases.

* Web Delivery Mechanism
    * Express.js
* Database Repositories
    * In-memory
    * Sequelize
        * Mariadb 
* External Services
    * jsonplaceholder (example)


## Uncle Bob's Clean Architecture Diagram

I tried to organize the application's files and folders according to this diagram:

[![Clean Architecture - By Uncle Bob](https://bl3302files.storage.live.com/y4mW9gccE03kr2tBTyqM-5NVT6uzZK0XZJpZff4jeKZIAJXRTN72oziMhtO1B8wv1NO0nQvCv9oGe5PRlH1OdRVSxGIBF0n5txGYQVP-eQs1wpFDb8WJICZ981zO2XC3Ho5_38QQOoDtn0qMUIy_3jEWyQ8iyS9JkNPJd2VuuzWFwwBFw7BC8zUNy2q7mRJRSDa?width=668&height=491)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

# Routes

These are the routes this API uses:

### Users

|`/users`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/users/:id`|get one user|
|GET|`/api/v1/users`|get all users|
|DELETE|`/api/v1/users/:id`|delete one user|
|PUT|`/api/v1/users:id`|update one user|
|POST|`/api/v1/users`|create one user|

### Products

|`/products`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/products/:id`|get one product|
|GET|`/api/v1/products`|get all products|
|DELETE|`/api/v1/products/:id`|delete one product|
|PUT|`/api/v1/products/:id`|update one product|
|POST|`/api/v1/products`|create one product|

### Orders

|`/orders`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/orders/:id`|get one order|
|GET|`/api/v1/orders`|get all orders|
|DELETE|`/api/v1/orders/:id`|delete one order|
|PUT|`/api/v1/orders/:id`|update one order|
|POST|`/api/v1/orders`|create one order|

### Images

|`/images`||||
|-|-|-|-|
|**Method**|**Route**|**Description**|
|GET|`/api/v1/images/:id`|get one image|
|GET|`/api/v1/images`|get all images|
|DELETE|`/api/v1/images/:id`|delete one image|
|PUT|`/api/v1/images/:id`|update one image|
|POST|`/api/v1/images`|create one image|

## Run Locally

#### Prerequisites
* Node.js
* Typescript
* Sequelize
* Mariadb


#### 1. Clone the repo and install dependencies
```bash
git clone 
cd clean-architecture-model-ts
npm install
```

#### 2. Modify the .env file
In the `.env` file, update the following environment variables for sequelize to work correctly.

* DB_DIALECT
    * (Enter "inMemory" to use the in-memory database)
* DB_NAME
* DB_USERNAME
* DB_PASSWORD
* DB_HOST
* DB_PORT
* PORT
    * (Defaults to 3000)

#### 3. Start the server
To run in production mode where code is transpiled into a `dist` folder and run directly in `node`:
```bash
npm start
```

To run in development mode where code is run by ts-node-dev and re-transpiled any time there is a change:
```bash
npm run dev:watch
```
