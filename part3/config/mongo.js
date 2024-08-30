const Mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await Mongoose.connect(process.env.MONGODB_URL)

    console.log(`SUCCESS: Connected to Database 🟢 | ${conn.connection.host} `)
  } catch (err) {
    console.log('ERROR: Could not connect to Database 🔴 ~ Try again! |', err)
    process.exit(1)
  }
}

module.exports = connectDB
