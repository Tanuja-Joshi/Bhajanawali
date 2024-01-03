const express = require('express')
const path=require('path')
const app = express()
const port = 3000
var exphbs= require('express-handlebars')
const connectToMongo=require('./db.js')
connectToMongo()

app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json())
app.use(express.static(path.join(__dirname,'static')))
app.use('/', require(path.join(__dirname,'routes/bhajans.js')))

app.listen(port, () => {
  console.log(`Bhajanawali app listening on port ${port}`)
})