import {getBreakpoint} from './util';

import Swiper from 'swiper';
import {Grid, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

const paginationWrapper = document.querySelector('.news__pagination');
const nextButtonNavigation = document.querySelector('.news__button--next');
const prevButtonNavigation = document.querySelector('.news__button--prev');

let newsSlider;
let currentBreakpoint;
let isCustomNavigation = false;

const initSwiper = () => {
  if (newsSlider) {
    newsSlider.destroy(true, true);
    paginationWrapper.removeEventListener('click', onPaginationClick);

    if(isCustomNavigation) {
      nextButtonNavigation.removeEventListener('click', onNavigationNextClick);
      prevButtonNavigation.removeEventListener('click', onNavigationPrevClick);
      isCustomNavigation = false;
    }
  }

  newsSlider = new Swiper('.news__slider', {
    modules: [Navigation, Pagination, Grid],
    slidesPerView: 1,
    spaceBetween:20,
    autoHeight: false,
    allowTouchMove: true,
    grid: {
      rows: 2,
      fill: 'column'
    },

    navigation: currentBreakpoint === 'mobile' ? {
      nextEl: '.news__button--next',
      prevEl: '.news__button--prev',
      enabled: true,
    } : {
      enabled: false,
    },

    pagination: {
      clickable: true,
      el: '.news__pagination',
      type: 'custom',
    },

    breakpoints: {
      768: {
        grid: {
          rows: 2,
          fill: 'row'
        },
        slidesPerView: 2,
        spaceBetween: 30,
      },

      1440: {
        grid: false,
        spaceBetween: 32,
        slidesPerView: 'auto',
        allowTouchMove: false,
      },
    },

    on: {
      init: function(swiper) {
        renderPagination(swiper);
        updateActivePagination(swiper);
        updateActiveSlide(swiper);
        updatePagination(swiper);
        if(currentBreakpoint !== 'mobile') {
          updateButtonNavigation(swiper);
        }
      },

      slideChange: function (swiper) {
        updateActivePagination(swiper);
        updatePagination(swiper);
        if(currentBreakpoint !== 'mobile') {
          updateButtonNavigation(swiper);
        }
      },
    },
  });
  paginationWrapper.addEventListener('click', onPaginationClick);

  if(currentBreakpoint !== 'mobile') {
    nextButtonNavigation.addEventListener('click', onNavigationNextClick);
    prevButtonNavigation.addEventListener('click', onNavigationPrevClick);
    isCustomNavigation = true;
  }
};

function updateActiveSlide(swiper) {
  swiper.slides.forEach((slide, index) => {
    slide.classList.remove('news__item--active');
    if (index === swiper.activeIndex) {
      slide.classList.add('news__item--active');
    }
  }
  );
}

function updateActivePagination(swiper) {
  const paginationButtons = document.querySelectorAll('.news__pagination-button');
  paginationButtons.forEach((button, index) => {
    button.classList.remove('news__pagination-button--active');
    if (index === swiper.activeIndex) {
      button.classList.add('news__pagination-button--active');
    }
  }
  );
}

function renderPagination(swiper) {
  paginationWrapper.innerHTML = '';

  let countButton;

  if(currentBreakpoint === 'desktop') {
    countButton = swiper.slides.length;
  } else {
    countButton = swiper.slides.length / 2;
  }

  for (let i = 0; i < countButton; i++) {
    const button = document.createElement('button');
    button.classList.add('news__pagination-button');
    button.textContent = i + 1;
    button.setAttribute('type', 'button');
    button.dataset.id = i;
    paginationWrapper.appendChild(button);
  }
}

function updateSlide () {
  updateActiveSlide(newsSlider);
  updatePagination(newsSlider);
  updateActivePagination(newsSlider);
  updateButtonNavigation(newsSlider);
}

function shiftSlide (index) {
  if(currentBreakpoint === 'desktop') {
    newsSlider.activeIndex = index;
    newsSlider.translateTo(-318 * index, 300);
  } else {
    newsSlider.slideTo(index);
  }

  updateSlide();
}

function onPaginationClick (evt) {
  const currentPaginationButton = evt.target.closest('.news__pagination-button');
  if(!currentPaginationButton) {
    return;
  }
  const idButton = Number(currentPaginationButton.dataset.id);
  shiftSlide(idButton);
}

function onNavigationPrevClick() {
  const step = currentBreakpoint === 'desktop' ? 3 : 2;
  shiftSlide(Math.max(newsSlider.activeIndex - step, 0));
}

function onNavigationNextClick() {
  const step = currentBreakpoint === 'desktop' ? 3 : 2;
  shiftSlide(Math.min(newsSlider.activeIndex + step, newsSlider.slides.length - step));
}

function updateButtonNavigation(swiper) {
  const total = currentBreakpoint === 'desktop' ? swiper.slides.length : swiper.slides.length / 2;
  const countShowSlides = currentBreakpoint === 'desktop' ? 3 : 2;
  if (swiper.activeIndex >= total - countShowSlides) {
    nextButtonNavigation.disabled = true;
  } else {
    nextButtonNavigation.disabled = false;
  }

  if (swiper.activeIndex === 0) {
    prevButtonNavigation.disabled = true;
  } else {
    prevButtonNavigation.disabled = false;
  }
}


function updatePagination(swiper) {
  const paginationButtons = document.querySelectorAll('.news__pagination-button');
  const totalCount = paginationButtons.length - 1;
  const currentIndex = swiper.activeIndex;

  paginationButtons.forEach((button, index) => {
    if (totalCount <= 4) {
      button.style.display = 'inline-block';
    } else if (currentIndex <= 2) {
      button.style.display = (index < 4) ? 'inline-block' : 'none';
    } else if(currentIndex < totalCount) {
      button.style.display = (index >= currentIndex - 2 && index <= currentIndex + 1) ? 'inline-block' : 'none';
    } else {
      button.style.display = (index >= currentIndex - 3 && index <= totalCount) ? 'inline-block' : 'none';
    }
  });
}

const onWindowResize = () => {
  const newBreakpoint = getBreakpoint();

  if (newBreakpoint !== currentBreakpoint) {
    currentBreakpoint = newBreakpoint;
    initSwiper();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  currentBreakpoint = getBreakpoint();
  initSwiper();
});

window.addEventListener('resize', onWindowResize);

window.addEventListener('pageshow', () => {
  if (newsSlider) {
    newsSlider.update();
  } else {
    initSwiper();
  }
});
