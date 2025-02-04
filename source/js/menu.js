const menuButton = document.querySelector('.navigation__toggle');
const menuList = document.querySelector('.navigation__list');
const subMenuList = document.querySelectorAll('.site-list__submenu');

menuList.style.maxHeight = '0';
subMenuList.forEach((subMenu) => {
  subMenu.style.maxHeight = '0';
});

const closeMenu = () => {
  menuList.classList.remove('navigation__list--open');
  document.body.classList.remove('page__body--overlay');
  menuButton.setAttribute('aria-expanded', 'false');
  menuList.style.maxHeight = '0';

  document.body.removeEventListener('click', onBodyClick);
};

const openMenu = () => {
  menuList.classList.add('navigation__list--open');
  document.body.classList.add('page__body--overlay');
  menuButton.setAttribute('aria-expanded', 'true');
  menuList.style.maxHeight = `${menuList.scrollHeight}px`;

  document.body.addEventListener('click', onBodyClick);
};

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('navigation__toggle--open');
  if(menuButton.classList.contains('navigation__toggle--open')) {
    openMenu();
  } else {
    closeMenu();
  }
});

function onBodyClick (evt) {
  if (!evt.target.closest('.navigation')) {
    menuButton.classList.remove('navigation__toggle--open');
    closeMenu();
  }
}

const menuUpdate = (toggle) => {
  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
  const id = toggle.getAttribute('aria-controls');
  const list = document.querySelector(`#${id}`);
  if(isExpanded) {
    list.style.maxHeight = `${list.scrollHeight}px`;
  } else {
    list.style.maxHeight = '0';
  }
  menuList.style.maxHeight = `${list.scrollHeight + menuList.scrollHeight}px`;
};

menuList.addEventListener('click', (evt) => {
  const currentLink = evt.target.closest('.site-list__link');
  const listLinks = document.querySelectorAll('.site-list__link');
  const hasSubmenu = currentLink.classList.contains('site-list__link--dropdown');

  if (!currentLink) {
    return;
  }
  listLinks.forEach((test) => {
    test.classList.remove('site-list__link--current');
  });
  currentLink.classList.add('site-list__link--current');
  if (!hasSubmenu) {
    listLinks.forEach((link) => {
      link.classList.remove('site-list__link--current');
    });
    currentLink.classList.add('site-list__link--current');
    return;
  }
  evt.preventDefault();
  currentLink.classList.toggle('site-list__link--opened');
  const id = currentLink.getAttribute('aria-controls');
  const list = document.querySelector(`#${id}`);
  if(currentLink.getAttribute('aria-expanded') === 'true') {
    currentLink.setAttribute('aria-expanded', 'false');
    list.classList.remove('site-list__submenu--opened');
  } else {
    currentLink.setAttribute('aria-expanded', 'true');
    list.classList.add('site-list__submenu--opened');
  }
  menuUpdate(currentLink);
});
