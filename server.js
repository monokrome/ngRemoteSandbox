var angular = require('angularjs-node'),
    jade = require('jade'),
    fs = require('fs'),
    app = require('express')(),
    jsdom = require('jsdom'),
    index;

// Get our application's index template content
index = jade.render(fs.readFileSync('templates/index.jade'));

// Give angular to ngRemote since dependencies are a mess in node
require('ngRemote').setup(angular);

app.get('/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var document = jsdom.jsdom(index);
  angular.bootstrap(document, ['remote']);
  res.end(document.documentElement.outerHTML);
});

app.listen(8080);
