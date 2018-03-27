//add books.js codez
'use strict';

var app = {};

//declare environment variable
const ENV = {};

//set the environment
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://book-app-week-3-mc-rg.github.io/book-list-client/';
ENV.developmentApiUrl = 'localhost3000:8080';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

//Wrap in IFFE

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

  return template(this);
};

Book.loadAll = rows => {
  rows.sort((a,b) => ((a.title) - (b.title)))

  rows.forEach(input => Book.all.push(new Book(input)))
}

Book.fetchAll = callback => {
  $.get('/api/v1/books')
    .then(results => {
      Book.loadAll(results);
      callback();
    })
};
