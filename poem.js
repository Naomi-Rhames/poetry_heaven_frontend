class Poem {
    constructor(poem, poemAttributes){
        this.id = poem
        this.title = poemAttributes.title
        this.genre = poemAttributes.genre
        this.author = poemAttributes.author
        this.stanza = poemAttributes.stanza
        this.image_url = poemAttributes.image_url
        this.category = poemAttributes.category
        Poem.all.push(this)
    } 

    static findById(id){
        return this.all.find(poem => { 
          return  poem.id == id});
    }
// Whatever it's executing on it is what This will represents

// In which is why we need to use arrow funtions inside of classes to make sure that it binds correctly because arrow functions automatically binds 'this' to the correct thing 
// so 'this' will always represent the thing that's actually executing the funtion itself
    renderUpdateForm(){
    //     return `
    //     <form data-id=${this.id}>
    //     <h3> Edit Poem </h3>

    //     <label> Edit Category</label>
    //     <select id="categories" name="categories" value="${this.category}>
    //         <option value= "1">Haiku</option>
    //         <option value= "2">Free Verse</option>
    //         <option value= "3">Sonnet</option>
    //         <option value= "4">Acrostic</option>
    //         <option value= "5">Villanelle</option>
    //         <option value= "6">Limerick</option>
    //         <option value= "7">Ode</option>
    //         <option value= "8">Elegy</option>
    //         <option value= "9">Ballad</option>
    //         <option value= "10">Stanza</option>
    //         <option value= "11">Epigram</option>
    //         <option value= "12">Epitaph</option> 
    //  </select>
    //     <br><br>

    //     <label> Edit Image URL</label>
    //     <input id='input-url' type="text" name="image" value="${this.image_url}" class="input-text">
    //     <br></br>


    //     <label> Edit Genre</label>
    //     <input id='input-genre' type="text" name="genre" value="${this.genre}" class="input-text">
    //     <br></br>

    //     <label> Edit Title</label>
    //     <input id='input-title' type="text" name="title" value="${this.title}" class="input-text">
    //     <br></br>

    //     <label> Edit Author Name </label>
    //     <input id='input-author' type="text name="author" value="${this.author}" class="input-author">
    //     <br></br>

    //     <label> Edit Stanza</label>
    //     <textarea id='input-stanza' type="text" name="stanza" value="">${this.stanza}</textarea>
    //     <br></br>

    //     <input id='edit-button' type="submit" value="Update Poem" class"submit">
    //     <br></br>
    //     </form>
    //      `;
        return `
        <form id="${this.id}">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Edit Title:</label>
          <input type="text" class="form-control" id='input-title' value="${this.title}"aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Speak creativly. Work your magic.</div>
        </div>
        <div>
            <label for="exampleInputEmail1" class="form-label">Edit Genre</label>
            <input type="text" value="${this.genre}"class="form-control" id='input-genre' aria-describedby="emailHelp">
           
        </div>
        <label for="exampleInputEmail1" class="form-label">Edit Image:</label>
        <input type="text" value="${this.image_url}"class="form-control" id='input-url' aria-describedby="emailHelp">
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Edit Stanza:</label>
          <textarea class="form-control" value="${this.stanza}" id='input-stanza' rows="3"></textarea>

          <label for="exampleInputEmail1" class="form-label">Edit Author Name:</label>
          <input type="text" value="${this.author}" class="form-control" id='input-author' aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <select id="categories" class="categories" value="${this.category}"aria-label="Default select example">
                <option selected> Please Select a Category: </option>
                <option value= "1">Haiku</option>
                <option value= "2">Free Verse</option>
                <option value= "3">Sonnet</option>
                <option value= "4">Acrostic</option>
                <option value= "5">Villanelle</option>
                <option value= "6">Limerick</option>
                <option value= "7">Ode</option>
                <option value= "8">Elegy</option>
                <option value= "9">Ballad</option>
                <option value= "10">Stanza</option>
                <option value= "11">Epigram</option>
                <option value= "12">Epitaph</option> 
            </select>
        </div>
        <button id="edit-button" name="submit" type="submit" class="btn btn-primary">Update Poem</button>
      </form>
</div>
        `
        
    }

    update({image_url, title, genre, author, stanza, category}){
        this.image_url = image_url;
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.stanza = stanza;
        this.category = category;
    }


    renderPoemCard() {
        return `
        <div data-id=${this.id}>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
          <img src="${this.image_url}" class="card-img-top" alt="...">

            <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <i><p class="card-title">Created By: ${this.author}</p></i>
              <p class="card-text">${this.stanza}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button data-id=${this.id} type="button">Edit</button>
                </div>
                <small class="text-muted">${this.category.name}</small>
              </div>
            </div>
          </div>
        </div> `;
    //     return `
    //     <div data-id=${this.id}>
    //         <img src=${this.image_url} height="200" width="250">
    //         <h3>${this.title}</h3>
    //         <p>${this.genre}<p>
    //         <p> ${this.author}</p>
    //         <p>${this.stanza}</p>
    //         <button data-id=${this.id}>edit</button>
    //       </div>
    //    <br></br>`;
     
    }
}


Poem.all = [];


// The diffrent between
// let - can be changed, it needs to be iniatilzed before getting called
// var - basically a way variables were declared initally in JS, can be changed but best not to use bc it will cause errors if you try to reassign (Considered as a global variable bc of how it get hoisted and when it does it automatically becomes undefined before it's initalized)
// const - cannot be reassigned