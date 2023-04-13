// Table
const requestedBooksTableBody = document.getElementById('requestedBooksTableBody');

// Toast
const toast = document.getElementById('requestedBooksToast');
const requestToast = bootstrap.Toast.getOrCreateInstance(toast);

const toastHeader = toast.querySelector('.toast-header');
const toastBody = toast.querySelector('.toast-body');


function handleBookReturn({rut, id}) {
  if(storage.returnBook({rut, id})) {
    handleSuccessReturn();
    updateTable()
  } else {
    handleReturnError();
  }
}

function handleSuccessReturn() {
  toastHeader.className = 'toast-header text-white bg-success'
  toastBody.innerHTML = 'Devolucion exitosa!'

  requestToast.show()
}

function handleReturnError() {
  toastHeader.className = 'toast-header text-white bg-danger'
  toastBody.innerHTML = '!! Devolucion fallida !!'

  requestToast.show()
}

function handleBookReturn({rut, id}) {
  if(storage.returnBook({rut, id})) {
    handleSuccessReturn()
    updateTable()
  } else {
    handleReturnError()
  }
}


function updateTable() {
  const requestedBooks = storage.getAllRequestedBooks();

  requestedBooksTableBody.innerHTML = '';

  if(requestedBooks.length <= 0) {
    requestedBooksTableBody.innerHTML = `
    <tr>
      <td colspan="5">No hay libros solicitados</td>
    </tr>
    `
  } else {
    requestedBooks.map(({name, rut, id, startDate, endDate}) => {
      startDate = new Date(startDate).toDateString()
      endDate = new Date(endDate).toDateString()

      requestedBooksTableBody.innerHTML += `
      <tr>
        <td class="text-break">${name}</td>
        <td class="text-break">${formatRut(rut)}</td>
        <td class="text-break">${id}</td>
        <td class="d-flex flex-column"><div>${startDate}</div><div>${endDate}</div></td>
        <td>
          <button onclick='handleBookReturn({"rut": "${rut}", "id": "${id}"})' class="btn btn-primary text-break">Devolver libro</button>
        </td>
      </tr>
      `
    })
  }

}

updateTable()