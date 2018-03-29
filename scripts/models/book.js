'use strict';

var app = app || {};

(function (module) {

  //declare environment variable
  const ENV = {};

  //set the environment
  ENV.isProduction = window.location.protocol === 'https:';
  ENV.productionApiUrl = 'https://book-app-week-3-mc-rg.github.io/book-list-client/';
  ENV.developmentApiUrl = 'localhost3000:8080';
  ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;



  //Constructor refactor to the lab 10 version including key value pair iteration...

  //Book constructor function
  function Book (input) {
    this.author = input.author;
    this.title = input.title;
    this.isbn = input.isbn;
    this.image_url = input.image_url;
    this.description = input.description;
  }

  Book.all = [];

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    console.log(this);
    return template(this);
  };

  Book.loadAll = rows => {
    rows.sort((a,b) => ((a.title) - (b.title)))

    rows.forEach(input => Book.all.push(new Book(input)))
  }

  const local = 'http://localhost:3000';

  Book.fetchAll = callback => {
    $.get(`${local}/api/v1/books`) //ENV.apiUrl
      .then(results => {
        app.Book.loadAll(results); //we think this is the problem...
        callback();
      })
  };

  Book.fetchOne = callback => {
    $.get(`${local}/api/vi/books/:id`)
      .then(results => {
        app.Book.loadBook(results);
        callback();
      })
  };

  Book.prototype.create = function(callback) {
    $.post(`${local}/api/v1/books`, {author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(console.log('create complete'))
      .then(callback);
  };

  module.Book = Book;
}) (app)