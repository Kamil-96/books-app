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
  console.log('Favorite books:', favoriteBooks);

  function initActions(){
    //let favoriteBooks = [];
    //console.log('Favorite books:', favoriteBooks);
    const clickedElements = document.querySelectorAll(select.all.bookLink);

    for(let clickedElement of clickedElements){
      clickedElement.addEventListener('dblclick', function(event){
        event.preventDefault();
        if(!clickedElement.classList.contains(classNames.favorite)){
          clickedElement.classList.add(classNames.favorite);
          const attribute = clickedElement.getAttribute(select.all.bookId);
          console.log('Attribute:', attribute);
          favoriteBooks.push(attribute);
          console.log('Favorite books:', favoriteBooks);
        } else{
          clickedElement.classList.remove(classNames.favorite);
          favoriteBooks.splice(select.all.bookId);
          //console.log('Favorite books:', favoriteBooks);
        }
      });
    }
  }


  render();
  initActions();


}

