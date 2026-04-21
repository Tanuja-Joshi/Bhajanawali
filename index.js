require('./loadEnv')()
const express = require('express')
const path=require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
var exphbs= require('express-handlebars')
const { connectToMongo, getDbState } = require('./db.js')

// Enable CORS for all routes
app.use(cors())

app.engine('handlebars',exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json())
app.use(express.static(path.join(__dirname,'static')))
app.use('/', require(path.join(__dirname,'routes/bhajans.js')))
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      port,
      storage: getDbState()
    }
  })
})

connectToMongo().finally(() => {
  app.listen(port, () => {
    const dbState = getDbState()
    console.log(`Bhajanawali app listening on port ${port} using ${dbState.mode} storage`)
  })
})
