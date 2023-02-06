const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const port = process.env.PORT 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
const db = require('./config/database') ;
const usersRouter = require('./router/user.router')

app.use('/users', usersRouter)

db .authenticate().then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })
app.listen(port, () => console.log(`server running on port ${port}`))  