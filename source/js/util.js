const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('message');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 2000);
};

const getBreakpoint = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 'mobile';
  }
  if (width < 1440) {
    return 'tablet';
  }
  return 'desktop';
};

export {showAlert, getBreakpoint};
