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

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      this.data = dataSource.books;

      thisBooksList.filters = [];
      thisBooksList.favoriteBooks = [];
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};
      thisBooksList.dom.clickedElement = document.querySelector(select.containerOf.list);
      thisBooksList.dom.formElem = document.querySelector(select.all.form);
      thisBooksList.dom.booksContainer = document.querySelector(select.containerOf.list);
    }

    render() {
      const thisBooksList = this;

      for(let book of this.data){

        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generatedHTML = templates.books({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });

        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.dom.booksContainer = document.querySelector(select.containerOf.list);
        thisBooksList.dom.booksContainer.appendChild(thisBooksList.element);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.dom.clickedElement.addEventListener('dblclick', function(event){
        event.preventDefault();
        const eventTarget = event.target.offsetParent;
        const attribute = eventTarget.getAttribute(select.all.bookId);

        if (!thisBooksList.favoriteBooks.includes(attribute)) {
          eventTarget.classList.add(classNames.favorite);
          thisBooksList.favoriteBooks.push(attribute);
          console.log('Favorite books:', thisBooksList.favoriteBooks);
        } else {
          eventTarget.classList.remove(classNames.favorite);
          thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(attribute), 1);
          console.log('Favorite books:', thisBooksList.favoriteBooks);
        }
      });

      thisBooksList.dom.formElem.addEventListener('change', function(event){
        event.preventDefault();
        const clickedElem = event.target;
        if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name == 'filter'){
          console.log(clickedElem.value);
          if(clickedElem.checked == true){
            thisBooksList.filters.push(clickedElem.value);
            console.log('Filters:', thisBooksList.filters);
          } else{
            const indexOfFilters = thisBooksList.filters.indexOf(clickedElem.value);
            thisBooksList.filters.splice(indexOfFilters, 1);
            console.log('Filters:', thisBooksList.filters);
          }
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for(let book of this.data){
        let shouldBeHidden = false;
        for(let filter of thisBooksList.filters){
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

    determineRatingBgc(rating) {
      const thisBooksList = this;

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
  }

  const app = new BooksList();
}

