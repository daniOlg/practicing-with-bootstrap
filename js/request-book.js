// Book listing
const bookContainer = document.getElementById('bookContainer');

const bookSearch = document.getElementById('bookSearch');
const bookSearchButton = document.getElementById('bookSearchButton');

// Request modal
const bookIdentifier = document.getElementById('bookIdentifier');
const bookTitle = document.getElementById('bookTitle');
const requestPeople = document.getElementById('requestPeople')
const bookReturnDate = document.getElementById('bookReturnDate');

// Toast
const toast = document.getElementById('requestBookToast');
const requestToast = bootstrap.Toast.getOrCreateInstance(toast);

const toastHeader = toast.querySelector('.toast-header');
const toastBody = toast.querySelector('.toast-body');


function handleSuccessRequest() {
  toastHeader.className = 'toast-header text-white bg-success'
  toastBody.innerHTML = 'Libro solicitado con exito!'

  requestToast.show()
}

function handleRequestError() {
  toastHeader.className = 'toast-header text-white bg-danger'
  toastBody.innerHTML = '!! El libro ya se ha solicitado !!'

  requestToast.show()
}


// Search logic and comfort
bookSearchButton.addEventListener('click', e => searchBookWithKeyword(bookSearch.value));
bookSearch.addEventListener('keydown', e => e.key == 'Enter' && searchBookWithKeyword(bookSearch.value));

// Loader functions
const turnLoaderOff = () => document.getElementById('loader').classList.replace('d-flex', 'd-none');
const turnLoaderOn = () => document.getElementById('loader').classList.replace('d-none', 'd-flex');

// Get book array from api
async function searchBookWithKeyword(keyword) {
  turnLoaderOn()

  updateBookGrid([])
  const bookArray = await books.getBooksFromKeyword(keyword);
  updateBookGrid(bookArray);

  turnLoaderOff()
}


// Update book grid
function updateBookGrid(bookArray) {
  bookContainer.innerHTML = ''
  bookArray.map(book => {
    bookContainer.innerHTML += stringTemplates.getBookTemplate(book);
  })
}


searchBookWithKeyword(); // Initialization of all

// Request book functions

function setModalView({id, title}) {
  bookIdentifier.placeholder = id;
  bookTitle.placeholder = title;

  // Set minimum day to tomorrow
  bookReturnDate.value = new Date(Date.now()+86400000).toISOString().substring(0,10)
  bookReturnDate.min = new Date(Date.now()+86400000).toISOString().substring(0,10)

  requestPeople.innerHTML = ''

  const readers = storage.getAllReaders();
  if(readers.length > 0) {
    readers.map(({name, rut}) => {
      requestPeople.innerHTML += `<option value='{"id": "${id}", "rut": "${rut}"}'>${name} - ${formatRut(rut)}</option>`
    })
  } else {
    requestPeople.innerHTML = '<option>## Debe inscribir al menos un lector ##</option>'
  }
}

function requestBook() {
  const {id, rut} = JSON.parse(requestPeople.value)
  const endDate = bookReturnDate.value;

  if(storage.requestBook({id, rut, endDate})) {
    handleSuccessRequest();
  } else {
    handleRequestError();
  }
}