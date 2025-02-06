import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

const programsSlider = new Swiper('.programs__slider', {
  modules: [Navigation, Scrollbar],
  slidesPerView: 'auto',
  spaceBetween: 30,
  autoHeight: true,

  navigation: {
    nextEl: '.programs__slider-button--next',
    prevEl: '.programs__slider-button--prev'
  },

  scrollbar: {
    el: '.programs__slider-scrollbar',
    draggable: true,
    dragSize: 326,
  },

  breakpoints: {
    768: {
      spaceBetween: 30,
    },
    1440: {
      spaceBetween: 32,
      allowTouchMove: false,
      scrollbar: {
        dragSize: 394,
      },
    }
  },
});

programsSlider.init();
