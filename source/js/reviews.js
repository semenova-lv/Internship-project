import {getBreakpoint} from './util';

import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

let reviewsSlider;
let currentBreakpoint;
let initialActiveSlide = 0;

const initSwiper = () => {
  if (reviewsSlider) {
    reviewsSlider.destroy(true, true);
  }
  reviewsSlider = new Swiper('.reviews__slider', {
    modules: [Navigation, Scrollbar],
    slidesPerView: 'auto',
    spaceBetween: 30,
    initialSlide: initialActiveSlide,

    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev'
    },

    scrollbar: {
      el: '.reviews__slider-scrollbar',
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

    on: {
      slideChange: function() {
        initialActiveSlide = this.activeIndex;
      }
    }
  });
};


const onWindowResize = () => {
  const newBreakpoint = getBreakpoint();

  if (newBreakpoint !== currentBreakpoint) {
    currentBreakpoint = newBreakpoint;
    initSwiper();
  }
};

window.addEventListener('load', () => {
  currentBreakpoint = getBreakpoint();
  initSwiper();
});

window.addEventListener('resize', onWindowResize);
