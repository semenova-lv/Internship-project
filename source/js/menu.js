const menuButton = document.querySelector('.navigation__toggle');
const menuList = document.querySelector('.navigation__list');
const subMenuList = document.querySelectorAll('.site-list__submenu');
const menuLinks = menuList.querySelectorAll('.site-list__link');

menuList.style.maxHeight = '0';
subMenuList.forEach((subMenu) => {
  subMenu.style.maxHeight = '0';
});

menuLinks.forEach((link) => {
  link.setAttribute('tabindex', '-1');
});

const closeMenu = () => {
  menuList.classList.remove('navigation__list--open');
  menuButton.classList.remove('navigation__toggle--open');
  document.body.classList.remove('page__body--overlay');
  menuButton.setAttribute('aria-expanded', 'false');
  menuList.setAttribute('aria-hidden', 'true');
  menuList.style.maxHeight = '0';

  menuLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });

  document.body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openMenu = () => {
  menuList.classList.add('navigation__list--open');
  menuButton.classList.add('navigation__toggle--open');
  document.body.classList.add('page__body--overlay');
  menuButton.setAttribute('aria-expanded', 'true');
  menuList.setAttribute('aria-hidden', 'false');
  menuList.style.maxHeight = `${menuList.scrollHeight}px`;

  menuLinks.forEach((link) => {
    if (!link.classList.contains('site-list__link-submenu')) {
      link.setAttribute('tabindex', '0');
    }
  });

  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

menuButton.addEventListener('click', () => {
  if(!menuButton.classList.contains('navigation__toggle--open')) {
    openMenu();
  } else {
    closeMenu();
  }
});

function onBodyClick (evt) {
  if (!evt.target.closest('.navigation')) {
    closeMenu();
  }
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMenu();
    menuButton.focus();
  }
}

const menuUpdate = (link) => {
  const isExpanded = link.getAttribute('aria-expanded') === 'true';
  const id = link.getAttribute('aria-controls');
  const submenuList = document.querySelector(`#${id}`);
  const submenuLinks = submenuList.querySelectorAll('.site-list__link');

  if(isExpanded) {
    link.setAttribute('aria-expanded', 'false');
    submenuList.classList.remove('site-list__submenu--opened');
    submenuList.setAttribute('aria-hidden', 'true');
    submenuLinks.forEach((submenuLink) => {
      submenuLink.setAttribute('tabindex', '-1');
    });
    submenuList.style.maxHeight = '0';
  } else {
    link.setAttribute('aria-expanded', 'true');
    submenuList.classList.add('site-list__submenu--opened');
    submenuList.setAttribute('aria-hidden', 'false');
    submenuLinks.forEach((submenuLink) => {
      submenuLink.setAttribute('tabindex', '0');
    });
    submenuList.style.maxHeight = `${submenuList.scrollHeight}px`;
  }

  menuList.style.maxHeight = `${submenuList.scrollHeight + menuList.scrollHeight}px`;
};

menuList.addEventListener('click', (evt) => {
  const currentLink = evt.target.closest('.site-list__link');
  const hasSubmenu = currentLink.classList.contains('site-list__link--dropdown');

  if (!currentLink) {
    return;
  }
  menuLinks.forEach((link) => {
    link.classList.remove('site-list__link--current');
  });
  currentLink.classList.add('site-list__link--current');
  if (!hasSubmenu) {
    menuLinks.forEach((link) => {
      link.classList.remove('site-list__link--current');
    });
    currentLink.classList.add('site-list__link--current');
    closeMenu();
    return;
  }
  evt.preventDefault();

  currentLink.classList.toggle('site-list__link--opened');
  menuUpdate(currentLink);
});
