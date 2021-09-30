
const myAPI = "http://127.0.0.1:3000/api/v1/poems"


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
      document.querySelector('#poem-container').innerHTML += newPoems.renderPoemCard();
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
  fetch(`http://127.0.0.1:3000/api/v1/poems/${poem.id}`, {
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
    document.querySelector('#poem-container').innerHTML = '';
    Poem.all.forEach(poem => document.querySelector('#poem-container').innerHTML += poem.renderPoemCard());
    document.querySelector('#update-poem').innerHTML = '';

  });
 
}

// function deletePoem(e) {
//   const id = e.target.id
//   fetch(`http://127.0.0.1:3000/api/v1/poems/${id}`, {
//     method: "DELETE",
//   })
//   .then(res => res.json())
//   .then(deletePoems => {
//     Poem.all = Poem.all.filter(poem => poem.id != deletePoems.id)
//     document.querySelector('#poem-container').innerHTML = "";
//     Poem.all.forEach(filteredPoem =>{
//       document.querySelector('#poem-container').innerHTML = filteredPoem.renderPoemCard();


   

//     })
//   })
// }



document.addEventListener('DOMContentLoaded', () => {
  getPoem()

 const sortPoemBttn = document.querySelector("#sort-button")
 sortPoemBttn.addEventListener("click", (e) => {
   sortPoems()
 })
  
  const createPoemForm = document.querySelector("#create-poem-form")
    createPoemForm.addEventListener("submit", (e) => 
    createFormHandler(e))

    const poemContainer = document.querySelector("#poem-container")
    poemContainer.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const poem = Poem.findById(id)
      document.querySelector('#update-poem').innerHTML += poem.renderUpdateForm();

    })
    document.querySelector('#update-poem').addEventListener('submit', e => updateFormHandler(e))
});




function createFormHandler(e){ 
  e.preventDefault()
  const imageInput = document.querySelector('#input-url').value
  const titleInput = document.querySelector('#input-title').value
  const genreInput = document.querySelector('#input-genre').value
  const authorInput = document.querySelector('#input-author').value
  const stanzaInput = document.querySelector('#input-stanza').value
  const categoryInput = parseInt(document.querySelector('#categories').value)
   postFetch(imageInput,titleInput,genreInput,authorInput,stanzaInput,categoryInput);
} 
 
function getPoem() {
    fetch(myAPI)
    .then(response => response.json())
    .then(poem => { poem.data.forEach(poem => {
     
     let displayPoem = new Poem(poem.id, poem.attributes)
     document.querySelector('#poem-container').innerHTML += displayPoem.renderPoemCard() 
      }) 

  
      
  })
  
}
// const search = document.querySelector("#search")

// const searchButton = document.querySelector('#search') 
//   search.addEventListener("click", e => {
//     e.preventDefault();
//     let query = document.getElementById("search-bar").value
//       fetch(`http://127.0.0.1:3000/api/v1/search/${query}`)
//       .then(res => res.json())
//       .then(poems => console.log(poems)
     
//       })
//     })
  
//   })

  



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
  document.querySelector("#poem-container").innerHTML = "";
  Poem.all.forEach((p) => {
    document.querySelector("#poem-container").innerHTML += p.renderPoemCard();
  })
}

