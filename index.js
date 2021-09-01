const myAPI = "http://127.0.0.1:3000/api/v1/poems"

document.addEventListener('DOMContentLoaded', () => {
  getPoem()
    });


    // Created a get function to make a call to our index endpoint in my API 
    // we put the get function in the DOM content event listener so that 
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

