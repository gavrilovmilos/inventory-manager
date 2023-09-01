### How to run the project?

## Database Setup
- Install and run MySql database server
- Create inventory_manager database (by default application uses root/root credentials)

## Project setup
1. Run npm install in the project root folder
2. Database init: knex migrate:up
3. Run the server: npx ts-node app/app.ts (By default server will be listening on 5405 port)
4. Run terminal client application: npx ts-node terminal-client/main.ts





