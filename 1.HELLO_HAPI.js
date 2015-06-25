var Hapi = require('hapi');
var server = new Hapi.Server();
var port = Number(process.argv[2] || 8080);
server.connection({
    host: 'localhost',
    port: port
});
server.route({path: '/', method: 'GET', handler: handler});
function handler(request, reply) {
    //request has all information
    //reply handles client response
    reply('Hello Hapi');
}
server.start(function () {
    console.info('Server is running on: ' + 'http://localhost:' + port);
});
