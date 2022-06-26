const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())

//routes prefixes
const eventRoutes = require('./routes/eventRoutes')
app.use('/event', eventRoutes)

module.exports = {app}