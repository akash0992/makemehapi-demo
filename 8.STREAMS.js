var Hapi = require('hapi');
var server = new Hapi.Server(),
    fs = require('fs'),
    rot13 = require('rot13-transform'),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (req, res) {
        var fileStream = fs.createReadStream('./files/sample.txt');
        res(fileStream.pipe(rot13())) ;

    }
});

server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
