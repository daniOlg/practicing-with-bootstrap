// Form
const readerName = document.getElementById('name');
const readerRut = document.getElementById('rut');

// Toast
const toast = document.getElementById('readerRegisterToast');
const registrationToast = bootstrap.Toast.getOrCreateInstance(toast);

const toastHeader = toast.querySelector('.toast-header');
const toastBody = toast.querySelector('.toast-body');

const name = document.getElementById('name').addEventListener('keydown', handleKey)
const rut = document.getElementById('rut').addEventListener('keydown', handleKey)

function handleKey (e) {e.key == 'Enter' && handleRegisterReader() }

// Functions
function handleRegisterReader() {
  const name = readerName.value;

  const regPattern = /[,.-]/g;
  const rut = readerRut.value.toString().replaceAll(regPattern, '');

  if(name.length > 15 && rut.length >= 8) {
    if (storage.registerReader({ name, rut }))
      handleSuccessRegistration();
    else
      handleRegistrationError()
  } else {
    handleRegistrationError();
  }

}

function handleSuccessRegistration() {
  toastHeader.className = 'toast-header text-white bg-success'
  toastBody.innerHTML = 'Registrado exitosamente!'

  readerName.value = ''
  readerRut.value = ''

  registrationToast.show()
}

function handleRegistrationError() {
  toastHeader.className = 'toast-header text-white bg-danger'
  toastBody.innerHTML = '!! Registro fallido, compruebe los datos o si ya se encuentra registrado !!'

  registrationToast.show()
}
