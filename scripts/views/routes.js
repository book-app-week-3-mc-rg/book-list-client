'use strict';

page('/', app.bookView.initIndexPage);
page('/books/new', ctx => app.Book.create(ctx, app.bookView.initFormPage));
page('/about', ctx => app.bookView.initAboutPage(ctx));
page('/detail', ctx => app.bookView.initDetailPage(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
// page('/admin', app.bookView.initAdminPage);

page();