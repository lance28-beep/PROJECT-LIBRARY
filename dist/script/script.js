var swiper = new Swiper('.mySwiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
})

let swiperslide = document.querySelectorAll('.swiper-slide')
let removeBtn = document.querySelectorAll('.remove-btn')
///modal
const modalBtn = document.querySelector('#modalBtn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal')

//input toggle change label
let input = document.querySelectorAll('input[type="checkbox"]')
let label = document.querySelectorAll('.switch-label')

let myLibrary = []

///create a book constructor
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary() {
  let title = document.querySelector('#title').value
  let author = document.querySelector('#author').value
  let pages = document.querySelector('#pages').value
  let read = document.querySelector('#read').checked
  let book = new Book(title, author, pages, read)
  if (title === '' || author === '' || pages === '') {
    alert('Please fill in all fields')
  }
  myLibrary.unshift(book)
  console.log(myLibrary)
}

///save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

///load from localStorage
function loadFromLocalStorage() {
  if (localStorage.getItem('myLibrary') !== null) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    console.log(myLibrary)
  }
}

///render books
function renderBooks() {
  let bookContainer = document.querySelector('.swiper-wrapper')
  bookContainer.innerHTML = ''
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i]
    let bookDiv = document.createElement('div')
    bookDiv.classList.add('swiper-slide')
    bookDiv.innerHTML = `
    <div class="book">
    <label class="switch">
       <p class="switch-label">${
         book.read ? 'mark as read' : 'mark as unread'
       }</p>
       <input type="checkbox" ${book.read ? 'checked' : ''}>
       <span class="slider"></span>
      </label>
      <div class="bookInfo">
       <h2>${book.title}</h2>
       <p>by ${book.author}</p>
      </div>
      <div class="book-button">
       <button class="remove-btn">Removed</button>
       <p class="pages">${book.pages} pages</p>
         </div>
    `
    bookContainer.appendChild(bookDiv)

    /////remove book
    let removeBtn = document.querySelectorAll('.remove-btn')
    removeBtn.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        let book = e.target.parentElement.parentElement.parentElement
        book.remove()
        swiper.update()
        myLibrary.splice(i, 1)
        saveToLocalStorage()
      })
    })
  }

  /////toggle read
  let read = document.querySelectorAll('input[type="checkbox"]')
  read.forEach(function (input) {
    input.addEventListener('change', function (e) {
      let book = e.target.parentElement.parentElement
      let p = book.querySelector('.switch-label')
      if (e.target.checked) {
        p.innerHTML = 'mark as read'
      } else {
        p.innerHTML = 'mark as unread'
      }
    })
  })
}

///add book
modalBtn.addEventListener('click', () => {
  modal.classList.add('modal-open')
})

closeBtn.addEventListener('click', () => {
  modal.classList.remove('modal-open')
})

//add book to library
document.querySelector('#addNewBook').addEventListener('click', () => {
  addBookToLibrary()
  renderBooks()
  saveToLocalStorage()
  booksLabel()
  modal.classList.remove('show')
  swiper.update()
})

//load from localStorage

loadFromLocalStorage()
renderBooks()
booksLabel()
//change background color each book
function booksLabel() {
  let book = document.querySelectorAll('.book')
  book.forEach(function (book) {
    //random background color
    let randomColor = () => {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return `rgb(${r}, ${g}, ${b})`
    }
    book.style.backgroundColor = randomColor()
  })
}
