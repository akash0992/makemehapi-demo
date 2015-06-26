var Hapi = require('hapi'), Joi = require('joi');
var server = new Hapi.Server(),
    fs = require('fs'),
    port = Number(process.argv[2] || 8080);

server.connection({
    host: 'localhost',
    port: port
});
server.route({
    method: 'GET',
    path: '/chickens/{breed}',
    handler: function (req, res) {
       res('hellooooooo.........quake quake..'+req.params.breed)
    },
    config: {
        validate: {
            params: {
                breed: Joi.string().required()
            }
        }
    }

});

server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
