const registeredPeopleDIV = document.querySelector('.registeredPeople');

const nameInput = document.getElementById('name');
const rutInput = document.getElementById('rut');

const registerButton = document.querySelector('button');

const store = window.localStorage;

/*** READERS FUNCTIONS ***/

function getAllReaders() {
  const readers = store.getItem('readers');

  if (readers != null) return JSON.parse(readers);
  else return [];
}

function updateReaderStorage(readerArray) {
  store.setItem('readers', JSON.stringify(readerArray));
}

// Get reader name with rut
function getReaderName(rut) {
  const readers = getAllReaders();
  
  
  const readerExist = readers.filter(reader => reader.rut == rut);
  if(readerExist.length <= 0) return false;

  return readerExist[0].name;
}

// GLOBAL FUNCTIONS

// Delete a reader
function deleteReader(rutToDelete) {
  const readers = getAllReaders();

  if(readers.filter(reader => reader.rut == rutToDelete).length <= 0) return false;
  
  const newReaderArray = readers.filter(({rut}) => rut != rutToDelete);
  updateReaderStorage(newReaderArray);

  return true;
}


// Register new reader
function registerReader({name, rut}) {
  const readers = getAllReaders()

  // Check if already readers
  if(readers.filter(reader => reader.rut == rut).length > 0) return false;

  const newReaderArray = [...readers, { name, rut }];
  updateReaderStorage(newReaderArray);

  return true;
}

/*** END OF READERS FUNCTIONS ***/




/*** BOOKS FUNCTIONS ***/
function getAllRequestedBooks() {
  const requests = store.getItem('requests');

  if (requests != null) return JSON.parse(requests);
  else return [];
}

function updateRequestStorage(readerArray) {
  store.setItem('requests', JSON.stringify(readerArray));
}

// GLOBAL FUNCTIONS

// Delete a reader
function returnBook({ rut, id }) {
  const requests = getAllRequestedBooks();

  const userRequests = requests.filter(request => request.rut == rut);
  if(userRequests.length <= 0) return false;

  const foundBookId = userRequests.filter(request => request.id == id);
  if(foundBookId.length <= 0) return false;
  
  const newRequestArray = requests.filter(req => !(req.id == id && req.rut == rut));
  updateRequestStorage(newRequestArray);

  return true;
}


// Register new reader
function requestBook({ rut, id, endDate }) {
  const requests = getAllRequestedBooks()

  const checkAlreadyRequested = requests.filter(req => req.rut == rut && req.id == id);
  if(checkAlreadyRequested.length > 0) return false;

  const name = getReaderName(rut);
  if(name == false) return false;
  
  const startDate = new Date(Date.now());

  const newRequestArray = [...requests, { name, rut, id, startDate, endDate }];
  updateRequestStorage(newRequestArray);

  return true;
}
/*** END OF BOOKS FUNCTIONS ***/

const storage = {
  getAllReaders,
  deleteReader,
  registerReader,

  getAllRequestedBooks,
  returnBook,
  requestBook
}