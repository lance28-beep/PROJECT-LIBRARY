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
