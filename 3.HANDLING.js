var Hapi = require('hapi'), path = require('path');
var server = new Hapi.Server(),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        file: path.join(__dirname, 'public', 'index.html')
    }
});

server.start(function () {
    console.info('Server is running on: ' + 'http://localhost:' + port);
});
