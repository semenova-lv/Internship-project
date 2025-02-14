const initSelect = (classSelect) => {
  const selectElement = document.querySelector(`.${classSelect}`);
  const selectButton = selectElement.querySelector('.select__button');
  const selectList = selectElement.querySelector('.select__list');
  const selectItems = selectList.querySelectorAll('.select__item');
  const selectInput = selectElement.querySelector('input');

  let currentIndex = 0;

  selectButton.addEventListener('click', () => {
    if(selectElement.classList.contains('select--open')) {
      selectClose();
    } else {
      selectOpen();
    }
  });

  function selectOpen() {
    selectElement.classList.add('select--open');
    updateSelect();
    selectItems.forEach((item) => {
      item.setAttribute('tabindex', '0');
      if(item.classList.contains('select__item--current')){
        item.focus();
      }
    });

    document.body.addEventListener('click', onBodyClick);
    selectElement.addEventListener('keydown', onSelectKeydown);
  }

  function selectClose() {
    selectElement.classList.remove('select--open');
    selectItems.forEach((item) => {
      item.setAttribute('tabindex', '-1');
    });

    document.body.removeEventListener('click', onBodyClick);
    selectElement.removeEventListener('keydown', onSelectKeydown);
  }

  function onBodyClick (evt) {
    if (!evt.target.closest('.select')) {
      selectClose();
    }
  }

  function selectedItem (index) {
    if (selectElement.classList.contains('select--open')) {
      selectItems[index].click();
    }
  }

  //управление с клавиатуры
  function onSelectKeydown (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      selectClose();
    }

    if (evt.key === 'Enter') {
      evt.preventDefault();
      selectedItem(currentIndex);
    }

    if (evt.key === 'ArrowUp') {
      evt.preventDefault();
      if (currentIndex > 0) {
        currentIndex = (currentIndex - 1 + selectItems.length) % selectItems.length;
        selectItems[currentIndex].focus();
      }

    }

    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      if (currentIndex < selectItems.length - 1) {
        currentIndex = (currentIndex + 1) % selectItems.length;
        selectItems[currentIndex].focus();
      }

    }

    if (evt.key === 'Tab') {
      evt.preventDefault();
      currentIndex = (currentIndex + 1) % selectItems.length;
      selectItems[currentIndex].focus();
    }
  }

  selectItems.forEach((item, index) => {
    item.dataset.id = index;
    item.addEventListener('click', () => {
      currentIndex = index;
      const currentValue = item.dataset.value;
      selectButton.textContent = item.textContent;
      selectInput.setAttribute('value', `${currentValue}`);
      selectClose();
      selectButton.focus();
    });
  });

  function updateSelect() {
    if (selectElement.classList.contains('select--open')) {
      selectItems.forEach((item, index) => {
        if (index === currentIndex) {
          item.classList.add('select__item--current');
        } else {
          item.classList.remove('select__item--current');
        }
      });
    }
  }
};

initSelect('modal__field-group--select');
initSelect('form__field-group--select');
