var Hapi = require('hapi'), Joi = require('joi');
var server = new Hapi.Server(),
    fs = require('fs'),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});
server.route({
    method: 'POST',
    path: '/login',
    handler: function (req, res) {
        res('login successful');
    },
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean(),
                username: Joi.alternatives().when('isGuest', {
                    is: false,
                    then: Joi.string().required(),
                    otherwise: Joi.string()
                }),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum(),
            })
                .options({allowUnknown: true})
                .with('username', 'password')
                .without('password', 'accessToken')
        }
    }
});

server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
