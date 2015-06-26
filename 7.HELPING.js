var Hapi = require('hapi'), Path = require('path');
var server = new Hapi.Server(),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});
server.views({
    engines: {
        html: require("handlebars")
    },
    relativeTo: Path.join(__dirname, 'public'),
    path: "templates",
    helpersPath: "../helpers"
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'helper.html'
    }
});

server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
