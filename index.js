const myAPI = "http://127.0.0.1:3000/api/v1/poems"

function createFormHandler(e){ // this prevent Deafult Behavior
  e.preventDefault()
  const imageInput = document.querySelector('#input-url').value
  const titleInput = document.querySelector('#input-title').value
  const authorInput = document.querySelector('#input-author').value
  const stanzaInput = document.querySelector('#input-stanza').value
  const categoryInput = parseInt(document.querySelector('#categories').value)
   postFetch(imageInput,titleInput,authorInput,stanzaInput,categoryInput);
} 

function postFetch(image_url, title, author, stanza, category_id){
  const bodyData = {image_url, title, author, stanza, category_id}
  fetch(myAPI, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())  
  .then(poem => { poem
    const poemsMarkup = `
    <div data-id=${poem.id}>
      <img
      src=${image_url}
      height="200" width="250">
      <h3>${poem.title}</h3>
      <p> ${poem.author}</p>
      <p>${poem.stanza}</p>
      <button data-id=${poem.id}>edit</button>
      </div>
      <br></br>`;

      document.querySelector('#poem-container').innerHTML += poemsMarkup

  })
    
}

function updateFormHandler(e){
  e.preventDefault();
  const id = parseInt(e.target.dataset.id);
  const poem = Poem.findById(id)
  const title = e.target.querySelector('#input-title').value;
  const author = e.target.querySelector('#input-author').value
  const stanza = e.target.querySelector('#input-stanza').value;
  const image_url = e.target.querySelector('#input-url').value;
  const category_id =  parseInt(e.target.querySelector('#categories').value);
  patchPoem(poem, title, author, stanza, image_url, category_id)
}

function patchPoem(poem, title, author, stanza, image_url, category_id){
  const bodyJSON = (poem, title, author, stanza, image_url, category_id)
  fetch(`http://127.0.0.1:3000/api/v1/poems/${poem.id}`, {
    method:'PATCH',
    header: {
      "Content-Type": "application/json",
      Accept: 'application/json'
    },
    body: JSON.stringify(bodyJSON)
  })
  .then(res => res.json())
  .then(updatePoem => console.log(updatePoem))
}


document.addEventListener('DOMContentLoaded', () => {
  getPoem()
  
  const createPoemForm = document.querySelector("#create-poem-form")
   
    createPoemForm.addEventListener("submit", (e) => 
    createFormHandler(e))

    const poemContainer = document.querySelector("#poem-container")
    poemContainer.addEventListener('click', e => {
      const id = parseInt(e.target.dataset.id);
      const poem = Poem.findById(id)
      document.querySelector('#update-poem').innerHTML = poem.renderUpdateForm();
   
    })
    document.querySelector('#update-poem').addEventListener('submit', e => updateFormHandler(e))
  });

 
function getPoem() {
    fetch(myAPI)
    .then(response => response.json())
    .then(poem => { poem.data.forEach(poem => { // we are using an arrow function because we are iterating through my API
     
      // debugger
     let newPoem = new Poem(poem, poem.attributes)
     
     document.querySelector('#poem-container').innerHTML += newPoem.renderPoemCard()
      }) 
  })



}

