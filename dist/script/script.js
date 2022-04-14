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

//show modal
modalBtn.addEventListener('click', () => {
  modal.classList.add('modal-open')
})

//close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('modal-open')
})

//close modal by clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('modal-open')
  }
})

///remove swiper-slider list
removeBtn.forEach((btn, key) => {
  btn.addEventListener('click', () => {
    // console.log(key)
    // console.log(swiperslide.key)
    // console.log(swiperslide[key])
    swiperslide[key].remove()
    swiper.update()
  })
})

//random background color
let randomColor = () => {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

swiperslide.forEach((slide) => {
  slide.style.backgroundColor = randomColor()
})

let myLibrary = []

function addBookToLibrary() {
  // do stuff here
}

//input toggle change label
let input = document.querySelectorAll('input[type="checkbox"]')
let label = document.querySelectorAll('.switch-label')

function booksLabel() {
  input.forEach((input, key) => {
    input.addEventListener('change', () => {
      if (input.checked) {
        label[key].innerHTML = `mark as read`
      } else {
        label[key].innerHTML = `mark as unread`
      }
    })
  })
}

///add book to library
//constructor

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
  myLibrary.push(book)
  console.log(book)
  console.log(myLibrary)
}

//save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

//add books
let addBtn = document.querySelector('#addNewBook')
addBtn.addEventListener('click', () => {
  addBookToLibrary()
  saveToLocalStorage()
  // location.reload()
  //reset form
  document.querySelector('#addBooktoLibrary').reset()
  //close modal
  modal.classList.remove('modal-open')
  booksLabel()
  createBook()
  swiper.update()
})

//get from localStorage
const mainContainer = document.querySelector('.swiper-wrapper')
const BooksCollection = JSON.parse(localStorage.getItem('myLibrary'))
console.log(BooksCollection)

//create book elements
function createBookElements(book) {
  let bookDiv = document.createElement('div')
  bookDiv.classList.add('swiper-slide')
  bookDiv.innerHTML = `
  <div class="book">
      <label class="switch">
       <p class="switch-label">${
         book.read ? 'mark as read' : 'mark as unread'
       }</p>
       <input type="checkbox" ${book.read ? 'checked' : ''} >
       <span class="slider"></span>
      </label>
      <div class="bookInfo">
       <h2>${book.title}</h2>
       <p>${book.author}</p>
      </div>
      <div class="book-button">
       <button class="remove-btn">Removed</button>
       <p class="pages">${book.pages} pages</p>
      </div>
     </div>`
  return bookDiv
}

//create Book each object
function createBook() {
  //create all elements inside main container
  BooksCollection.forEach((book) => {
    mainContainer.appendChild(createBookElements(book))
  })
}
