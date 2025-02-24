import Swiper from 'swiper';
import {FreeMode, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';

const tabsButtonsList = document.querySelector('.news__tab-navigation');
let newsTabsSlider;

const onTabButtonClick = (evt) => {
  const currentTabButton = evt.target.closest('.news__tab-button');
  if(!currentTabButton) {
    return;
  }
  evt.preventDefault();
  document.querySelector('.news__tab-button--active').classList.remove('news__tab-button--active');
  currentTabButton.classList.add('news__tab-button--active');
};

tabsButtonsList.addEventListener('click', onTabButtonClick);

const initSwiper = () => {
  newsTabsSlider = new Swiper('.news__tab-slider', {
    modules: [Mousewheel, FreeMode],
    enabled: true,
    direction: 'horizontal',
    slidesPerView: 'auto',
    watchOverflow: true,
    mousewheel: true,
    freeMode: true,
    spaceBetween: 10,
    passiveListeners: true,
  });
};

const onWindowResize = () => {
  const isMobile = window.innerWidth < 768;
  if (isMobile && !newsTabsSlider) {
    initSwiper();
  } else if (!isMobile && newsTabsSlider) {
    newsTabsSlider.destroy(true, true);
    newsTabsSlider = null;
  }
};

window.addEventListener('load', onWindowResize);
window.addEventListener('resize', onWindowResize);
