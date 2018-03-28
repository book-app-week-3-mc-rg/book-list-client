//this is our error view file
'use strict';

var app = app || {};

(function(module) {
  var errorView = {};

  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();

    let template = Handlebars.compile($('#error-template').text());
    return template(err).append('#error-message');
  }

  app.errorView = errorView;
}) (app)