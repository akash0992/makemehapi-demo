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
    path: '/upload',
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: function (request, reply) {
            var data = request.payload;
            if (data.file) {
                var name = data.file.hapi.filename;
                var path = __dirname + "/uploads/" + name;
                var file = fs.createWriteStream(path);
                file.on('error', function (err) {
                    console.error(err)
                });
                data.file.pipe(file);
                data.file.on('end', function (err) {
                    fs.readFile(path, 'utf8', function (err, text) {
                        if (err) {
                            return console.log(err);
                        }
                        var ret = {
                            description: request.payload.description,//description from form
                            file: {
                                data: text,  //content of file uploaded
                                filename: data.file.hapi.filename, //name of file uploaded
                                headers: data.file.hapi.headers//file header provided by hapi
                            }
                        }
                        reply(JSON.stringify(ret));
                    });

                })
            }

        }
    }
});

server.start(function () {
    console.info('Server is running at: ' + server.info.uri);
});
//To verify in local system you can try
//curl --form file=@{filePath} --form description=HANDLING.js http://localhost:8080/upload
