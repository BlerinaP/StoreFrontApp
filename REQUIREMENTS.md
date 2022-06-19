# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

##STARTING APP
1.First Step create manually in your local machine a postgres DATABASE
2.Create .env file and put there
-ENV = dev (or test if you are testing)
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- BCRYPT_PASSWORD
- SALT_ROUNDS

If you are testing create another Database just for testing and another env variable
- POSTGRES_DB_TEST

Start app with npm start.
Test routes in postman
## API Endpoints
#### Products
- Index => Route => http://localhost:3000/products
- Show => Route => http://localhost:3000/products/id
In Body(x-www-from-urlencoded tab)
add the required fields, key {id} and values {id of product you want}
- Create [token required] => Route => http://localhost:3000/products
To test this apis i used postman, so in postman you have to change route-action to POST, In Body(x-www-from-urlencoded tab)
add the required fields, key {name, price} and values {names, price you want}
- Delete[token required] => Route => http://localhost:3000/products. Change route action to Delete and add product id in body 


#### Users
- Index [token required] => Route => http://localhost:3000/users
In postman go to authorization tab and in type choose bearer token, in the right side paste the token you get when you create a user
- Show [token required] Route => http://localhost:3000/users/id
In Body(x-www-from-urlencoded tab)
add the required fields, key {id} and values {id of user you want}
- Create N[token required]Route => http://localhost:3000/users
To test this apis i used postman, so in postman you have to change route-action to POST, In Body(x-www-from-urlencoded tab)
add the required fields, key {firstname, lastname, password} and values {values you want}
- Delete[token required] => Route => http://localhost:3000/users. Change route action to Delete and add user id in body


#### Orders
- Index [token required] => Route => http://localhost:3000/orders
  In postman go to authorization tab and in type choose bearer token, in the right side paste the token you get when you create a user
- Show [token required] Route => http://localhost:3000/orders/id
- In Body(x-www-from-urlencoded tab)
  add the required fields, key {id} and values {id of order you want}
- Show User orders [token required]  => http://localholst:3000/orders/user/user_id
    In body (x-www-from-urlencoded tab) add user_id variable
- Current Order by user (args: user id)[token required] => Route 'http://localhost:3000/orders/user/user_id
In Body(x-www-from-urlencoded tab)
add the required fields, key {user_id} and values {id of the user}
In postman go to authorization tab and in type choose bearer token, in the right side paste the token you get when you create a user

## Data Shapes
#### Product
-  id
- name
- price


#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order ??
- quantity of each product in the order
- user_id ??
- status of order (active or complete)

## Orders-Products
- id
- id of each product in the order
- quantity of each product in the order
