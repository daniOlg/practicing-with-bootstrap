// Table
const readersTableBody = document.getElementById('readersTableBody');

// Toast
const toast = document.getElementById('readerDeletionToast');
const deletionToast = bootstrap.Toast.getOrCreateInstance(toast);

const toastHeader = toast.querySelector('.toast-header');
const toastBody = toast.querySelector('.toast-body');

function handleDelete(rut) {
  if(storage.deleteReader(rut)) {
    handleSuccessDelete();
    updateTable()
  } else {
    handleDeleteError();
  }
}

function handleSuccessDelete() {
  toastHeader.className = 'toast-header text-white bg-success'
  toastBody.innerHTML = 'Eliminado exitosamente!'

  updateTable()

  deletionToast.show()
}

function handleDeleteError() {
  toastHeader.className = 'toast-header text-white bg-danger'
  toastBody.innerHTML = '!! Eliminacion fallida !!'

  deletionToast.show()
}


function updateTable() {
  const readers = storage.getAllReaders();

  readersTableBody.innerHTML = '';

  if(readers.length <= 0) {
    readersTableBody.innerHTML = `
    <tr>
      <td colspan="3">No hay lectores inscritos</td>
    </tr>
    `
  } else {
    readers.map(({name, rut}) => {
      readersTableBody.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${formatRut(rut)}</td>
        <td>
          <button onclick='handleDelete(${rut})' class="btn btn-danger">Eliminar lector</button>
        </td>
      </tr>
      `
    })
  }

}

updateTable()