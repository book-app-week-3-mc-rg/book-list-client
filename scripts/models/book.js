'use strict';

var app = app || {};

//declare environment variable
const ENV = {};

//set the environment
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://book-app-week-3-mc-rg.github.io/book-list-client/';
ENV.developmentApiUrl = 'localhost:3000'; //we removed 8080
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {

  //Constructor refactor to the lab 10 version including key value pair iteration...

  //Book constructor function
  function Book (input) {
    this.book_id = input.book_id;
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

  Book.prototype.detailToHtml = function () {
    let template = Handlebars.compile($('#detail-view-template').text());
    return template(this);
  };

  Book.loadAll = rows => {
    rows.sort((a,b) => ((a.title) - (b.title)))

    rows.forEach(input => Book.all.push(new Book(input)))
  }

  const local = 'http://localhost:3000';

  Book.fetchAll = callback => {
    $.get(`http://localhost:3000/api/v1/books`) //ENV.apiUrl
      .then(results => {
        app.Book.loadAll(results); //we think this is the problem...
        callback();
      })
  };

  Book.fetchOne = (ctx, callback) => { 
    $.get(`http://localhost:3000/api/v1/books/${ctx.params.book_id}`) 
      .then(results => {
        console.log(results);
        callback(ctx, results);
      })
  };

  Book.prototype.create = function(callback) {
    $.post(`${local}/api/v1/books`, {author: this.author, title: this.title, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(console.log('create complete'))
      .then(callback);
  };

// Book.about = function(callback) {
//   $.get
// }


  module.Book = Book;
}) (app)