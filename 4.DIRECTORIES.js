var Hapi = require('hapi'), path = require('path');
var server = new Hapi.Server(),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});

server.route({
    path: '/{public*}',
    /* path: '/foo/bar/baz/{filename}',
     //alternate solution
     */
    method: 'GET',
    handler: {
        directory: {path: './public'}
    }
});

server.start(function () {
    console.info('Server is running on: ' + 'http://localhost:' + port);
});
