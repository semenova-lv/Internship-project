const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__close-button');
const buttonOpenModal = document.querySelector('.about__button');

const modalOpen = () => {
  modal.classList.remove('modal--closed');
  document.body.classList.add('page__body--no-scroll');
  modalButton.focus();

  modal.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const modalClose = () => {
  modal.classList.add('modal--closed');
  document.body.classList.remove('page__body--no-scroll');
  buttonOpenModal.focus();

  modal.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onBodyClick (evt) {
  if (!evt.target.closest('.modal__wrapper')) {
    modalClose();
  }
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    modalClose();
  }
}


buttonOpenModal.addEventListener('click', () => {
  modalOpen();
});

modalButton.addEventListener('click', () => {
  modalClose();
});

export {modalClose};
