var Hapi = require('hapi'), Joi = require('joi');
var server = new Hapi.Server(),
    fs = require('fs'),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});
server.state('session', {
    ttl: 10,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true, // don't allow violations of RFC 6265
    path: '/{path*}',
    domain: 'localhost'

});

server.route({
    method: 'GET',
    path: '/set-cookie',
    config: {
        state: {
            parse: true,
            failAction: 'log'
        },
        handler: function (req, res) {
            res('success').state('session', {key: 'makemehapi'})
        }
    }
});
server.route({
    method: 'GET',
    path: '/check-cookie',

    config: {
        handler: function (req, res) {
            var session = req.state.session;
            if (session) {
                res({
                    user: 'hapi'
                });
            } else {
                res(new Hapi.error.unauthorized('Missing authentication'));
            }
        }
    }
});
server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
