const faqContent = document.querySelector('.faq__list');
const accordeonsItems = document.querySelectorAll('.faq__item');

//первоначальная настройка, добавляем атрибуты
accordeonsItems.forEach((item, index) => {
  const buttonToggle = item.querySelector('.faq__button-toggle');
  const accordeonContent = item.querySelector('div');
  buttonToggle.setAttribute('data-accordeon', index);
  accordeonContent.setAttribute('data-id', index);
});

const updateAccordeon = () => {
  const listContent = document.querySelectorAll('.faq__item');
  listContent.forEach((item) => {
    const buttonToggle = item.querySelector('.faq__button-toggle');
    const currentContent = item.querySelector('div');
    const isExpanded = buttonToggle.getAttribute('aria-expanded') === 'true';
    if(isExpanded) {
      currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
    } else {
      currentContent.style.maxHeight = '0';
    }
  });
};

updateAccordeon();

const onClickButtonToggle = (evt) => {
  const contentList = Array.from(faqContent.querySelectorAll('div'));
  const currentButton = evt.target.closest('.faq__button-toggle');
  if(currentButton) {
    const isExpanded = currentButton.getAttribute('aria-expanded') === 'true';
    const id = currentButton.getAttribute('data-accordeon');
    const currentContent = contentList[contentList.findIndex((elem) => elem.dataset.id === id)];
    if (isExpanded) {
      currentButton.setAttribute('aria-expanded', 'false');
      currentButton.classList.remove('faq__button-toggle--open');
      currentContent.style.maxHeight = '0';
    } else {
      currentButton.setAttribute('aria-expanded', 'true');
      currentButton.classList.add('faq__button-toggle--open');
      currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
    }
  }
};

faqContent.addEventListener('click', onClickButtonToggle);
