const {app} = require('./src/app');
const http = require('http');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

startServer();
