const myAPI = "http://127.0.0.1:3000/api/v1/poems"

function createFormHandler(e){ // this prevent Deafult Behavior
  e.preventDefault()
  const imageInput = document.querySelector('#input-url').value
  const titleInput = document.querySelector('#input-title').value
  const authorInput = document.querySelector('#input-author').value
  const stanzaInput = document.querySelector('#input-stanza').value
  const categoryInput = parseInt(document.querySelector('#categories').value)
   postFetch(imageInput,titleInput,authorInput,stanzaInput);
} 

function postFetch(image_url, title, author, stanza){
  const bodyData = {image_url, title, author, stanza}
  fetch(myAPI, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())  
  .then(poem => {
    console.log(poem); 
  })
  
}
/////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  getPoem()
  
  const createPoemForm = document.querySelector("#create-poem-form")
   
    createPoemForm.addEventListener("submit", (e) => 
    createFormHandler(e))
  });

 
function getPoem() {
    fetch(myAPI)
    .then(response => response.json())
    .then(poem => { poem.data.forEach(poem => { // we are using an arrow function because we are iterating through my API
      const poemsMarkup = `
        <div data-id=${poem.id}>
          <img
          src=${poem.attributes.image_url}
          height="200" width="250">
          <h3>${poem.attributes.title}</h3>
          <p> ${poem.attributes.author}</p>
          <p>${poem.attributes.stanza}</p>
          <button data-id=${poem.id}>edit</button>
          </div>
          <br></br>`;


      document.querySelector('#poem-container').innerHTML += poemsMarkup // we are appending it and updating thr inner HTML and appending that #poem-container div that we created in the index.html file
      })   
  })

}

