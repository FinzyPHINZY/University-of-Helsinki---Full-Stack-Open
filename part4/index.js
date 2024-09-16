require('dotenv').config

const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  logger.info(
    `Server running on http://localhost:${process.env.PORT} ...betta go catch it`
  )
})
