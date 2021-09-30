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

    renderUpdateForm(){
        return `
        <form id=${this.id}>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col">
          <div class="card shadow-sm">
          <img src="${this.image_url}" class="card-img-top" alt="...">
          <input id='input-url' type="text" placeholder="Change Image" value="${this.image_url}">
            <div class="card-body">
            <input id='input-title' type="text" placeholder="Change Title" value="${this.title}" >
            <input id='input-genre' type="text" placeholder="Change Genre" value="${this.genre}" >
            <input id='input-author' type="text" placeholder="Change Name" value="${this.author}" >
            <textarea id='input-stanza' type="text" placeholder="Change Poem" value="${this.stanza}" ></textarea>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <select id="categories" class="categories" value="${this.category}"">
                 <option selected> Edit Category: </option>
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
                <small class="filterDiv" class="text-muted">${this.category.name}</small>
              </div>
            </div>
          </div>
        </div> `;
    } 
}

Poem.all = [];


