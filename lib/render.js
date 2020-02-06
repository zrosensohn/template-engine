const fs = require('fs');

function renderHTML (res) {
    fs.readFile('./output/index.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    })
}

function handleRequest(req, res) {
    let path = req.url

    switch(path) {
        case "/":
            return renderHTML(res);
        
        default:
            return res.end("404 page not found");
    }
}

module.exports = handleRequest;