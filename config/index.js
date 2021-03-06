const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

module.exports = {
    rootPath: path.resolve(__dirname, '..'),
    serviceName: process.env.SERVICE_NAME,
    urlDb: process.env.MONGO_URL,
    cloudName: process.env.CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}