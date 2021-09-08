class Poem {
    constructor(poem, poemAttributes){
        this.id = poem.id
        this.title = poemAttributes.title
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
        <form data-id=${this.id}>
        <h3> Edit Poem </h3>

        <label> Edit Category</label>
        <select id="categories" name="categories" value="${this.description}>
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
        <br><br>

        <label> Edit Image URL</label>
        <input id='input-url' type="text" name="image" value-"${this.image_url}" class="input-text">
        <br></br>


        <label> Edit Title</label>
        <input id='input-title' type="text" name="title" value="${this.title}" class="input-text">
        <br></br>

        <label> Edit Author Name </label>
        <input id='input-author' type="text name="author" valur="${this.author}" class="input-author">
        <br></br>

        <label> Edit Stanza</label>
        <textarea id='input-stanza' type="text" name="stanza" value"">${this.stanza}</textarea>
        <br></br>

        <input id='edit-button' type="submit" value="Update Poem" class"submit">
        <br></br>
        </form>
         `;
        
    }

    renderPoemCard() {
        return `
        <div data-id=${this.id}>
            <img src=${this.image_url} height="200" width="250">
            <h3>${this.title}</h3>
            <p> ${this.author}</p>
            <p>${this.stanza}</p>
            <button data-id=${this.id}>edit</button>
          </div>
       <br></br>`;
     
    }
}


Poem.all = [];