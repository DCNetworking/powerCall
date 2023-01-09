const { app } = require('./src/app');
const http = require('http');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const {
    MONGO_CLIENT_SETTINGS, CONNECTION_URI, CONNECT_ERROR_500, CONNECT_SUCCESS_MSG,
} = require("./src/constants");
mongoose.connection.on('error', (err) => {
    console.log(CONNECT_ERROR_500);
    console.error(err)
})
mongoose.connection.once('open', () => {
    console.log(CONNECT_SUCCESS_MSG);
})
const server = http.createServer(app)
async function startServer() {
    await mongoose.connect(CONNECTION_URI, MONGO_CLIENT_SETTINGS)
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

startServer();

