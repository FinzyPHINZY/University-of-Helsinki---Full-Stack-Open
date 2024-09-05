require('dotenv').config

const app = require('./app')
const logger = require('./utils/logger')

app.listen(process.env.PORT, () => {
  logger.info(
    `Server running on http://localhost:${process.env.PORT} ...betta go catch it`
  )
})
