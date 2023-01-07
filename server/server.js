const { app } = require('./src/app');
const http = require('http');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const {
    SESSION_SETTINGS, MONGO_CLIENT_SETTINGS, CONNECTION_URI, CONNECT_ERROR_500, CONNECT_SUCCESS_MSG,
    CONNECT_STATUS_STABLE
} = require("./src/constants");

mongoose.connection.on('error', (err) => {
    console.log(err);
})

const server = http.createServer(app)
const { userSchema } = require('./src/mongo_schemas');
async function startServer() {
    await mongoose.connect(CONNECTION_URI, MONGO_CLIENT_SETTINGS)
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

startServer();

