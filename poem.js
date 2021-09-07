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