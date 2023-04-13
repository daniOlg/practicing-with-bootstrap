const API_URL = 'https://www.googleapis.com/books/v1';


// Return array with formatted book data
async function getBooksFromKeyword(keyword) {
  if(keyword == '' || keyword == null) keyword = 'bootstrap';

  const res = await fetch(`${API_URL}/volumes?q=${keyword}`);
  const json = await res.json();

  return formatBookArray(json.items);
}

// Return formatted book data
async function getBookFromId(id) {
  const res = await fetch(`${API_URL}/volumes/${id}`);
  const book = await res.json();

  return formatBookData(book);
}

function formatBookArray(books) {
  return books.map(book => formatBookData(book));
}

function formatBookData(bookData) {
  const { id, volumeInfo } = bookData;
  const { title, authors, publisher, publishedDate, pageCount, imageLinks, previewLink } = volumeInfo;

  const noinfo = 'Sin informacion';
  const noimg = 'https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg'; // No image cover

  let shortTitle = title;
  if(title.length > 23) shortTitle = title.substring(0, 19)+'...';

  return {
    id,
    title: title || noinfo,
    shortTitle: shortTitle || noinfo,
    authors: authors || [],
    publisher: publisher || noinfo,
    publishedDate: publishedDate || noinfo,
    pageCount: pageCount || noinfo,
    thumbnail: imageLinks ? imageLinks.thumbnail : noimg,
    previewLink: previewLink || '#'
  }
}

const books = {
  getBookFromId,
  getBooksFromKeyword
}