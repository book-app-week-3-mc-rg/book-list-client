//add book-view codez here
'use strict';

//IFFE
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    app.Book.all.forEach(a => $('#book-list').append(a.toHtml()).addClass('.book-view'));
    $('.book-view').show();
  }

  module.bookView = bookView;
}) (app)


