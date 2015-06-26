var Hapi = require('hapi'), Path = require('path');
var server = new Hapi.Server(),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});

server.route({
    method: 'GET',
    path: '/proxy',
    handler: {
        proxy: {
            host: '127.0.0.1',
            port: 65535
        }
    }

});

server.start(function () {
    console.info('Server is running on: ' + 'http://' + server.info.host + ':' + server.info.port);
});
