const PORT = 3000;//端口号

let http = require('http');
let url = require('url');
let fs = require('fs');
let mine = require('./mine').types;//
let path = require('path');
let webapp = 'E:\\front\\drag-and-drop\\app';

let server = http.createServer(function (request, response) {
    let parseUrl = request.url;
    //不添加路径时，默认导向index.html
    if (parseUrl == '/') {
        parseUrl = '/index.html';
    }
    let pathname = url.parse(parseUrl).pathname;
    let realPath = path.join(webapp, pathname);    //这里设置自己的文件名称;

    let ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    let contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");