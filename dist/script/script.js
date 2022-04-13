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
let swiperslide = document.querySelectorAll('.swiper-slide')
let removeBtn = document.querySelectorAll('.remove-btn')

removeBtn.forEach((btn, key) => {
  btn.addEventListener('click', () => {
    // console.log(key)
    // console.log(swiperslide.key)
    // console.log(swiperslide[key])
    swiperslide[key].remove()
  })
})
