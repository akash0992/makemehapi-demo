var Hapi = require('hapi'), Path = require('path');
var server = new Hapi.Server(),
    port = Number(process.argv[2] || 8000);

server.connection({
    host: 'localhost',
    port: port
});
server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'public', 'templates')
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'index.html'
    }
});

server.start(function () {
    console.info('Server is running on: ' + 'http://' + server.info.host + ':' + server.info.port);
});
