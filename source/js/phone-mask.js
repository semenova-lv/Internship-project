const phoneInputList = document.querySelectorAll('input[name="phone"]');

const applyPhoneMask = (input) => {
  input.addEventListener('input', () => {
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('7')) {
      value = `+${ value}`;
    } else {
      value = `+7${ value}`;
    }

    value = value.substring(0, 12);

    if (value.length < 5) {
      value = value.replace(/(\+7)?/, '$1 (');
    } else if (value.length < 8) {
      value = value.replace(/(\+7)(\d{3})?/, '$1 ($2) ');
    } else if (value.length < 10) {
      value = value.replace(/(\+7)(\d{3})?(\d{3})?/, '$1 ($2) $3-');
    } else {
      value = value.replace(/(\+7)(\d{3})?(\d{3})?(\d{2})?(\d{2})?/, '$1 ($2) $3-$4-$5');
    }

    input.value = value;
  });

  input.addEventListener('focus', () => {
    if (!input.value.startsWith('+7')) {
      input.value = '+7 (';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (input.selectionStart < 3 && e.key === 'Backspace') {
      e.preventDefault();
    }

    if (e.key === 'Backspace') {
      const cursorPos = input.selectionStart;
      const value = input.value;

      // Если курсор стоит после разделителя, удаляем его и предыдущий символ
      if (cursorPos > 3 && /[\s()-]/.test(value[cursorPos - 1])) {
        e.preventDefault();
        input.value = value.slice(0, cursorPos - 2) + value.slice(cursorPos);
        input.setSelectionRange(cursorPos - 2, cursorPos - 2); // Ставим курсор на нужное место
      }
    }
  });
};

phoneInputList.forEach((phoneInput) => {
  applyPhoneMask(phoneInput);
});
