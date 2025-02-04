import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';
import 'swiper/css';

//перемещает пагинацию на активный слайд
const movePagination = () => {
  const hero = document.querySelector('.hero');
  const activeSlide = hero.querySelector('.swiper-slide-active .hero__slide-information');
  const paginationElement = hero.querySelector('.hero__pagination');

  if(activeSlide && paginationElement) {
    activeSlide.insertAdjacentElement('afterBegin', paginationElement);
  }
};

const checkTab = () => {
  const hero = document.querySelector('.hero__slider');
  const sledesList = hero.querySelectorAll('.hero__item');

  sledesList.forEach((slide) => {
    const slidesButton = slide.querySelector('.hero__button');
    if (!slide.classList.contains('swiper-slide-active')) {
      slidesButton.setAttribute('tabindex', '-1');
    } else {
      slidesButton.setAttribute('tabindex', '0');
    }
  });
};

checkTab();

const heroSlider = new Swiper('.hero__slider', {
  modules: [Pagination],
  loop: 'true',
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 0,
  // autoHeight: true,

  pagination: {
    clickable: true,
    el: '.hero__pagination',
    bulletClass: 'hero__pagination-button',
    bulletActiveClass: 'hero__pagination-button--active',
    renderBullet: (index, className) => `<button class="${className}" type="button" data-index="${index}"><span class="visually-hidden">Слайд ${index + 1}</span></button>`,
  },

  allowTouchMove: true,
  on: {
    slideChangeTransitionStart: () => {
      movePagination();
      checkTab();
    },
    slideChange: () => {
      movePagination();
      checkTab();
    }
  },
  breakpoints: {
    1440: {
      allowTouchMove: false,
    },
  },
});

heroSlider.init();
