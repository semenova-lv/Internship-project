import {getBreakpoint} from './util';

import Swiper from 'swiper';
import {Navigation, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';

let programsSlider;
let currentBreakpoint;
let initialActiveSlide = 0;

const initSwiper = () => {

  if (programsSlider) {
    programsSlider.destroy(true, true);
  }

  programsSlider = new Swiper('.programs__slider', {
    modules: [Navigation, Scrollbar],
    slidesPerView: 'auto',
    spaceBetween: 30,
    initialSlide: initialActiveSlide,

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
