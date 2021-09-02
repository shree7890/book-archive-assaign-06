const searchResult = document.getElementById("search-result");
const bookShow = document.getElementById("book-show");
// search book
const searchBook = () => {
    searchResult.innerHTML = `
    <div class="h-100 w-100 d-flex justify-content-center align align-items-center">
        <div class="spinner-border" role="status">
         <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // error handling validation
    if (searchText === '') {
        searchResult.innerHTML = `<h5 class="w-50 mx-auto text-danger">Please! Valid book Name Of Search</h5>`;
    }
    // console.log(searchText);
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        searchField.value = "";
        bookShow.innerHTML = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
// display search result book
const displaySearchResult = books => {
    // console.log(books);
    const arr = books.filter(favourite => favourite.cover_i !== undefined && favourite.author_name !== undefined && favourite.publisher !== undefined && favourite.title !== undefined && favourite.first_publish_year !== undefined);
    console.log(arr);
    // error handling validation
    if (arr.length === 0) {
        bookShow.innerHTML = "";
        searchResult.innerHTML = `<h5 class="w-50 mx-auto text-danger">No Result Found!</h5>`;
    }
    else {
        const p = document.createElement("p");
        // book show quantity
        p.innerHTML = `<h5 class="w-50 mx-auto text-primary">You got ${arr.length} books</h5>`;
        bookShow.innerHTML = '';
        bookShow.appendChild(p);
        searchResult.innerHTML = '';
        books.forEach(book => {
            console.log(book);
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card card-all text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-card" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title.slice(0, 20)}</h3>
                    <h4 class="author">${book.author_name[0]}</h4>
                    <h5 class="publisher text-muted">${book.publisher[0]}</h5>
                    <p class="year">First Publish Year: ${book.first_publish_year}</p>
                    
                </div >
            </div >
    `;
            searchResult.appendChild(div);
        })
    }
}