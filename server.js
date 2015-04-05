var angularFactory = require('angularjs-node'),
    jade = require('jade'),
    fs = require('fs'),
    app = require('express')(),
    jsdom = require('jsdom'),
    index;

// Get our application's index template content
index = jade.render(fs.readFileSync('templates/index.jade'));

app.get('/*', function (request, response, next) {
  var angular,
      url = request.protocol + '://' + request.get('host') + request.originalUrl;


  jsdom.env({
    url: url,
    html: index,
    done: function (errors, window) {
      angular = angularFactory(window);

      require('ngRemote').setup(angular);
      angular.bootstrap(window.document, ['remote']);

      response.writeHead(200, {
        'Content-Type': 'text/html'
      });

      response.end(window.document.documentElement.outerHTML);
    }
  });
});

app.listen(8080);
