# ToDo Lists App (Test Task)

1) Using data scheme implement missing entities TodoList and TodoListItems. 
2) For each entity should be implemented following:
 - DB table
 - Model
 - Controller
 - Resolvers and Schemas 
3) For complete DB structure implementation src/database/migrations/<timestamp>_init.js should be changed
4) Each entity should have complete CRUD (+ count method)
5) When finished update docs/postman.json

Entities related as

```
User 1:N TodoList 1:N TodoListItem
```  

As a reference you may use TodoList entity.
Entities consists of
 - Interface (graphql - schemas/resolvers)
 - Controller - logic part of app's component
 - Model - data describing part of app's component

## Using App

App contains docker-compose.yaml where PostgreSQL image is defined.
User and password for DB are defined in docker-compose.yaml
To run image use: 
```bash
docker-compose up -d postgres
```

### Useful Application Commands

```bash
npm run dev # run app in development mode. with hot reload
npm run migration:up # apply last DB migration
npm run migration:down # rollback laster DB migration
```


### Useful Links

OpenCrud standard: https://www.opencrud.org/

ORM: https://vincit.github.io/objection.js/

DB schema: https://dbdiagram.io/d/618cfa6d02cf5d186b512b2d