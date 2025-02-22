import Swiper from 'swiper';
import {Grid, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

const originalSlides = document.querySelectorAll('.news__item');
const paginationWrapper = document.querySelector('.news__pagination');
const nextButtonNavigation = document.querySelector('.news__button--next');
const prevButtonNavigation = document.querySelector('.news__button--prev');

let newsSlider;
let currentBreakpoint;
let isCustomNavigation = false;

function getBreakpoint () {
  const width = window.innerWidth;
  if (width < 768) {
    return 'mobile';
  }
  if (width < 1440) {
    return 'tablet';
  }
  return 'desktop';
}

function duplicateSledes () {
  const sliderWrapper = document.querySelector('.news__list');
  sliderWrapper.innerHTML = '';

  const slidesToDuplicate = 3;

  for (let i = 0; i < slidesToDuplicate; i++) {
    originalSlides.forEach((slide) => {
      sliderWrapper.appendChild(slide.cloneNode(true));
    });
  }
}

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

function onPaginationClick (evt) {
  const currentPaginationButton = evt.target.closest('.news__pagination-button');
  if(!currentPaginationButton) {
    return;
  }
  const idButton = Number(currentPaginationButton.dataset.id);
  newsSlider.activeIndex = idButton;
  if(currentBreakpoint === 'desktop') {
    newsSlider.translateTo(-318 * idButton, 300);
  } else {
    newsSlider.slideTo(idButton);
  }
  updateActiveSlide(newsSlider);
  updatePagination(newsSlider);
  updateActivePagination(newsSlider);
  updateButtonNavigation(newsSlider);
}

function onNavigationPrevClick() {
  let newIndex;
  if(currentBreakpoint === 'desktop') {
    newIndex = newsSlider.activeIndex - 3;
    if (newIndex < 0) {
      newIndex = 0;
    }
    newsSlider.activeIndex = newIndex;
    newsSlider.translateTo(-318 * newIndex, 300);
  }
  if (currentBreakpoint === 'tablet') {
    newIndex = newsSlider.activeIndex - 2;
    if (newIndex < 0) {
      newIndex = 0;
    }
    newsSlider.slideTo(newIndex);
  }
  updateActiveSlide(newsSlider);
  updatePagination(newsSlider);
  updateActivePagination(newsSlider);
  updateButtonNavigation(newsSlider);
}

function onNavigationNextClick() {
  let newIndex;
  const total = newsSlider.slides.length;
  if(currentBreakpoint === 'desktop') {
    newIndex = newsSlider.activeIndex + 3;
    if (newIndex >= total - 3) {
      newIndex = total - 3;
    }
    newsSlider.activeIndex = newIndex;
    newsSlider.translateTo(-318 * newIndex, 300);
  }
  if (currentBreakpoint === 'tablet') {
    newIndex = newsSlider.activeIndex + 2;
    newsSlider.slideTo(newIndex);
  }
  updateActiveSlide(newsSlider);
  updatePagination(newsSlider);
  updateActivePagination(newsSlider);
  updateButtonNavigation(newsSlider);
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
    duplicateSledes();
    initSwiper();
  }
};

window.addEventListener('load', () => {
  currentBreakpoint = getBreakpoint();
  duplicateSledes();
  initSwiper();
});

window.addEventListener('resize', onWindowResize);
