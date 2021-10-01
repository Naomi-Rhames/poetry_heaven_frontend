
const myAPI = "http://127.0.0.1:3000/api/v1/poems"
const createPoemForm = document.querySelector("#create-poem-form")
const poemContainer = document.querySelector('#poem-container')
const searchButton = document.querySelector('#search')
const updatePoemContainer = document.querySelector('#update-poem')

document.addEventListener('DOMContentLoaded', () => {
  getPoem()

 const sortPoemBttn = document.querySelector("#sort-button")
 sortPoemBttn.addEventListener("click", (e) => {
   sortPoems()
 })
  
  createPoemForm.addEventListener("submit", (e) => 
    createFormHandler(e))
    
   poemContainer.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const poem = Poem.findById(id)
      updatePoemContainer.innerHTML += poem.renderUpdateForm();
    })
    updatePoemContainer.addEventListener('submit', e => updateFormHandler(e))
});

function getPoem() {
  fetch(myAPI)
  .then(response => response.json())
  .then(poem => { poem.data.forEach(poem => {
   let displayPoem = new Poem(poem.id, poem.attributes)
   poemContainer.innerHTML += displayPoem.renderPoemCard() 
    })  
  })
}
  
function createFormHandler(e){ 
  e.preventDefault()
  const imageInput = document.querySelector('#input-url').value
  const titleInput = document.querySelector('#input-title').value
  const genreInput = document.querySelector('#input-genre').value
  const authorInput = document.querySelector('#input-author').value
  const stanzaInput = document.querySelector('#input-stanza').value
  const categoryInput = parseInt(document.querySelector('#categories').value)
  createPoemForm.reset()
   postFetch(imageInput,titleInput,genreInput,authorInput,stanzaInput,categoryInput);
} 

function postFetch(image_url, title, genre, author, stanza, category_id){
  const bodyData = {image_url, title, genre, author, stanza, category_id} 
  fetch(myAPI, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json()) 
  .then(poem => { 
    const newPoems = new Poem(poem.data.id, poem.data.attributes)
    poemContainer.innerHTML += newPoems.renderPoemCard();
  })
}

function updateFormHandler(e){
  e.preventDefault(); 
  const id = parseInt(e.target.id); 
  const poem = Poem.findById(id)
  const title = e.target.querySelector('#input-title').value;
  const author = e.target.querySelector('#input-author').value;
  const genre = e.target.querySelector('#input-genre').value;
  const stanza = e.target.querySelector('#input-stanza').value;
  const image_url = e.target.querySelector('#input-url').value;
  const category_id =  parseInt(e.target.querySelector('#categories').value);
  patchPoem(title, genre, author, stanza, image_url, category_id, poem)
}

function patchPoem(title, genre, author, stanza, image_url, category_id, poem){
  const bodyJSON = {title, genre, author, stanza, image_url, category_id }
  fetch(myAPI + `/${poem.id}`, {
    method:'PATCH',
    headers: {   
      "Content-Type": "application/json",
      Accept: 'application/json'
    },
    body: JSON.stringify(bodyJSON)
  })
  .then(res => res.json())
  .then(updatePoem => { 
    let poem = Poem.findById(updatePoem.data.id);
    poem.update(updatePoem.data.attributes); 
    poemContainer.innerHTML = '';
    Poem.all.forEach(poem => poemContainer.innerHTML += poem.renderPoemCard());
    updatePoemContainer.innerHTML = '';
  });
}
 
searchButton.addEventListener("click", e => {
  e.preventDefault();
  let query = document.getElementById("search-bar").value
    fetch(`http://127.0.0.1:3000/api/v1/search/${query}`)
    .then(res => res.json())
    .then(poems => {
      poemContainer.innerHTML = "";
      poems.forEach((p) => {
        poemContainer.innerHTML += 
     `
    <div data-id=${p.id}>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div class="col">
      <div class="card shadow-sm">
      <img src="${p.image_url}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${p.title}</h5>
        <i><p class="card-title">Created By: ${p.author}</p></i>
          <p class="card-text">${p.stanza}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button data-id=${p.id} type="button">Edit</button>
            </div>
            <small class="filterDiv" class="text-muted">${query}</small>
          </div>
        </div>
      </div>
    </div> `;
      })
    })
})

function sortPoems() {
  Poem.all = Poem.all.sort((a,b) => { 
    let titleA = a.title.toLowerCase();
    let titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB){
      return 1;
    }
    return 0;
  })
  poemContainer.innerHTML = "";
  Poem.all.forEach((p) => {
  poemContainer.innerHTML += p.renderPoemCard();
  })
}

