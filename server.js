const {app} = require('./app');
const config = require('./config')

app.listen(config.port, () => {
    console.log(`Server is succesfully running on port ${config.port}`)
})