const inputSearch = document.querySelector('#search-books input');
const submit = document.querySelector('.submit');
const tbody = document.querySelector('tbody');


submit.addEventListener('click', function(e){
    let num = 0
    let notFound = document.querySelector('#book-list p')

    for(let book of tbody.children){
        if(book.children[0].textContent.indexOf(inputSearch.value) !==-1){
            book.style.display = 'table-row';
            num++;
        } else {
            book.style.display = 'none';
        }
    }
    if (num == 0) {
        notFound.style.display = 'block';
    }
    else{
        notFound.style.display = 'none';
    }
});


tbody.addEventListener('click', function(e){
    if(e.target.className === 'borrow'){
        e.target.setAttribute('disabled','');
        e.target.style.cursor = 'not-allowed';
    }
})


