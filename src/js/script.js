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
      bookId: 'data-id',
      form: '.filters',
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

      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      //const generatedHTML = templates.books(book);
      const generatedHTML = templates.books({
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingBgc,
        ratingWidth,
      });

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
    const formElem = document.querySelector(select.all.form);

    formElem.addEventListener('change', function(event){
      event.preventDefault();
      const clickedElem = event.target;
      if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name == 'filter'){
        console.log(clickedElem.value);
        if(clickedElem.checked == true){
          filters.push(clickedElem.value);
          console.log('Filters:', filters);
        } else{
          const indexOfFilters = filters.indexOf(clickedElem.value);
          filters.splice(indexOfFilters, 1);
          console.log('Filters:', filters);
        }
      }
      filterBooks();
    });
  }

  let filters = [];

  function filterBooks(){

    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const findBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if(shouldBeHidden == true){
        findBook.classList.add('hidden');
      } else{
        findBook.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){

    let background = '';
    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }


  render();
  initActions();
}

