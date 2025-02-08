import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const reviewsSlider = new Swiper('.reviews__slider', {
  modules: [Navigation, Scrollbar],
  slidesPerView: 'auto',
  spaceBetween: 30,
  autoHeight: true,

  navigation: {
    nextEl: '.reviews__button--next',
    prevEl: '.reviews__button--prev'
  },

  scrollbar: {
    el: '.reviews__slider-scrollbar',
    draggable: true,
    // dragSize: 326,
  },

  breakpoints: {
    768: {
      spaceBetween: 30,
    },
    1440: {
      spaceBetween: 32,
      allowTouchMove: false,
      // scrollbar: {
      //   dragSize: 394,
      // },
    }
  },
});

reviewsSlider.init();
