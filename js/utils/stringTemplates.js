function getBookTemplate(bookData) {
  const { id, title, shortTitle, authors, publisher, publishedDate, pageCount, thumbnail, previewLink } = bookData;

  const authorsString = authors && authors.length > 0 && authors.map(author => {
    // Name uppercase first
    author = author.toLowerCase().split(' ').map(name => 
      name.replace(',','').substring(0, 1).toUpperCase() + name.substring(1, name.length)
    ).join(' ')

    return `<div class="row">
      <div class="col">- ${author}</div>
    </div>`
  }).toString().replaceAll(',','');

  return `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card">
    <img identifier='${id}' src="${thumbnail}" alt="${title} thumbnail" class="card-img-top vh-25 p-3">
        <div class="card-body">
          <h5 class="card-title" title="${title}">${shortTitle}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="row">
              <div class="col">
                <h6>Autor(es):</h6>
              </div>
            </div>
            ${authorsString}
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col">
                <h6>Publicado por:</h6>
              </div>
              </div>
            <div class="row">
              <div class="col">- ${publisher}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col"><h6>Publicacion:</h6></div>
              <div class="col">${publishedDate}</div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="row">
              <div class="col"><h6># de paginas:</h6></div>
              <div class="col">${pageCount}</div>
            </div>
          </li>
        </ul>
          <a class="btn btn-dark m-2" href="${previewLink}" target="_blank">Vista previa</a>
          <button onClick="setModalView({id: '${id}', title: '${title}'})" class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#bookRequestModal">Solicitar libro</button>
      </div>
    </div>
    `
}

const stringTemplates = {
  getBookTemplate
}