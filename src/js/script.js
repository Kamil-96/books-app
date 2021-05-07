{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      list: '.books-list',
    },
    all: {
      bookLink: '.book__image',
      bookId: 'data-id'
    },
  };
  const classNames = {
    favorite: 'favorite',
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

  let favoriteBooks = [];

  function initActions(){

    const clickedElement = document.querySelector(select.containerOf.list);

    clickedElement.addEventListener('dblclick', function(event){
      event.preventDefault();
      const eventTarget = event.target.offsetParent;
      const attribute = eventTarget.getAttribute(select.all.bookId);

      if (!favoriteBooks.includes(attribute)) {
        eventTarget.classList.add(classNames.favorite);
        favoriteBooks.push(attribute);
        console.log('Favorite books:', favoriteBooks);
      } else {
        eventTarget.classList.remove(classNames.favorite);
        favoriteBooks.splice(favoriteBooks.indexOf(attribute), 1);
        console.log('Favorite books:', favoriteBooks);
      }
    });
  }

  render();
  initActions();
}

