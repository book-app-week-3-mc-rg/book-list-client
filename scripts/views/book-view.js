'use strict';

//IFFE
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('#book-list').empty();
    app.Book.all.forEach(a => $('#book-list').append(a.toHtml()).addClass('.book-view'));
    $('.book-view').show();
    $('#book-list').show();
  }

  bookView.initDetailPage = (ctx, results) => {
    $('.container').hide();
    $('#book-list').hide();
    console.log("inside detail", results);
    //add rendering for template, section id="detail-view"
    //target the section listen for click on button
    $('#detail-view').append(results.detailToHtml()).addClass('.detail');
    $('#detail-view').show();
  }

  bookView.initFormPage = () => {
    $('.container').hide();
    $('#form-view').show();
  }


  bookView.initAboutPage = (ctx) => {
    $('.container').hide();
    $('#book-list').hide();
    $('#about').show();
  }

  // bookView.initAdminPage = (ctx) => {
  //   $('.container').hide();
  //   //add rendering for template id="detail-view"
  //   $('').show();
  // }

  module.bookView = bookView;
}) (app)


