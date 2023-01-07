const { app } = require('./src/app');
const http = require('http');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const {
    SESSION_SETTINGS, MONGO_CLIENT_SETTINGS, CONNECTION_URI, CONNECT_ERROR_500, CONNECT_SUCCESS_MSG,
    CONNECT_STATUS_STABLE
} = require("./src/constants");

const ConnectDB = new Promise((res, rej) => {
    try {
        mongoose.connect(CONNECTION_URI, MONGO_CLIENT_SETTINGS)
        res(mongoose.connection)
    } catch (err) {
        rej(err)
    }
    res()
})

const server = http.createServer(app)
const { userSchema } = require('./src/mongo_schemas');
async function startServer() {
    ConnectDB.then((data) => {
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
}

startServer();

