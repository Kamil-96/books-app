{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      list: '.books-list',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  function render(){

    for(let book of dataSource.books){
      const generatedHTML = templates.books(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.list);
      booksContainer.appendChild(element);
    }
  }
  render();



}

