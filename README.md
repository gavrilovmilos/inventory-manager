## About the project
Inventory Manager is simple application consisting of 2 parts:
1. NodeJs express server with MySQL database
2. Client - interactive command line application

NodeJs server exposes Restful HTTP API which is used as communication protocol between client and server.

Client application consists of 2 modules:
- Inventory Manager with 3 actions supported:
  - Get inventory report for specific ingredient which includes the current stock available
  - Add new ingredient feature
  - Update ingredient stock feature
- PoC Module - with 2 actions available:
  - List available recipes in the system
  - Place order functionality

## How to run the project?

### Database Setup
- Install and run MySql database server (by default application uses root/root credentials)
- Create ```inventory_manager``` database 

### Project setup
1. Run ```npm install``` in the project root folder
2. Initialise database schema: ```knex migrate:up```
3. Populate database with demo data: ```knex migrate:up``` (same command as previous)
3. Run the server: ```npx ts-node app/app.ts``` (By default server will be listening on 5405 port)
4. Run terminal client application: ```npx ts-node terminal-client/terminal-main.ts```

Demo data contain 2 recipes and 5 ingredients.
More ingredients can be added via command line application. However, current version of the application
does not have support for adding new recipes.
