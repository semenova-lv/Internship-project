import {initSelect} from './select.js';
import {modalClose} from './modal.js';
import {showAlert} from './util.js';

const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ ]+$/;
const PHONE_REGEX = /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/;
const ErrorMessage = {
  ISREQUIRED: 'Поле обязательно для заполнения',
  ERROR_PHONE: 'Введите корректный номер телефона, без букв, пример +7 (000) 000-00-00',
  ERROR_NAME: 'Поле может содержать только буквы и пробелы',
  ERROR_CONSENT: 'Чтобы продолжить, необходимо дать согласие на обработку персональных данных',
};

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const formList = document.querySelectorAll('form');

const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = SubmitButtonText.IDLE;
};

const isValidName = (input) => NAME_REGEX.test(input.value);

const isValidPhone = (input) => PHONE_REGEX.test(input.value);

function validateForm (form) {
  const fieldPhone = form.querySelector('input[name="phone"]');
  const fieldName = form.querySelector('input[name="name"]');
  const fieldCity = form.querySelector('input[name="city"]');
  const fieldMessage = form.querySelector('textarea');
  const fieldConsent = form.querySelector('input[name="consent"]');
  const fieldList = form.querySelectorAll('input, textarea');

  let isValid = true;

  fieldList.forEach((input) => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
    });
  });

  function validateField (input, validateFunction = null, message = '') {
    if (!input) {
      return;
    }
    const valueInput = input.value.trim();
    if (!valueInput) {
      input.setCustomValidity(ErrorMessage.ISREQUIRED);
      input.classList.add('field-group__input--invalid');
      isValid = false;
    } else if (validateFunction && !validateFunction(input)) {
      input.setCustomValidity(message);
      input.classList.add('field-group__input--invalid');
      isValid = false;
    } else {
      input.setCustomValidity('');
      input.classList.remove('field-group__input--invalid');
    }
  }

  validateField(fieldPhone, isValidPhone, ErrorMessage.ERROR_PHONE);
  validateField(fieldName, isValidName, ErrorMessage.ERROR_NAME);
  if (fieldMessage) {
    validateField(fieldMessage);
  }
  validateField(fieldCity);

  if (fieldConsent && !fieldConsent.checked) {
    fieldConsent.classList.add('field-group__input--invalid');
    fieldConsent.setCustomValidity(ErrorMessage.ERROR_CONSENT);
    isValid = false;
  } else {
    fieldConsent.setCustomValidity('');
    fieldConsent.classList.remove('field-group__input--invalid');
  }

  return isValid;
}

formList.forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  const selectElenent = initSelect(form, 'field-group--select');

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!validateForm(form)) {
      form.reportValidity();
    } else {
      blockSubmitButton(submitButton);
      const formData = new FormData(evt.target);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных');
        }
        form.reset();
        selectElenent.selectReset();
        if (form.dataset.id === 'modal') {
          modalClose();
        }
        showAlert('Форма успешно отправлена!');
      } catch (error) {
        showAlert(error.message);
      } finally {
        unblockSubmitButton(submitButton);
      }
    }
  });
});
