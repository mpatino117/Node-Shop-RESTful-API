const http = require('http')
const port = process.env.PORT || 3001

const app = require('./app')

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server now running on ${port}`)
})