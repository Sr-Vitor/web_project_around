function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener("input", (event) => {
      validateInput(form, event.target, config);
      toggleButtonState(form, config);
    });

    toggleButtonState(form, config);
  });
}

function validateInput(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, errorElement, input.validationMessage, config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, errorElement, errorMessage, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));

  if (inputs.some((input) => !input.validity.valid)) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
    button.style.backgroundColor = "#ccc"; // Cor do botão desabilitado
    button.style.cursor = "not-allowed"; // Cursor para estado desabilitado
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
    button.style.backgroundColor = "#000"; // Cor do botão habilitado
    button.style.cursor = "pointer"; // Cursor para estado habilitado
  }
}

export { enableValidation };
