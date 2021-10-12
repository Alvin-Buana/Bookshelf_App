
let STORAGE_KEY = "Book_App";

let book = [];
let id = 0;

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

if(checkForStorage()){
        if (localStorage.getItem(STORAGE_KEY) === null) {
            book = [];
        } else {
            book = JSON.parse(localStorage.getItem(STORAGE_KEY));
        }     
        
        	
        localStorage.setItem(STORAGE_KEY, JSON.stringify(book));   
        
    
    window.onload = function(e){ 
        		
        Display_books(book);
    }
}



function Done(i){
    book[i].isComplete=true;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
	Display_books(book);

 }
function NotDone(i){
    book[i].isComplete=false;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
	Display_books(book);
}

function Remove(i){
    book.splice(i, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
	Display_books(book);
}

function makeNewBooks(){
    let title = document.getElementById('inputBookTitle').value;
    let author = document.getElementById('inputBookAuthor').value;
	let year =  document.getElementById('inputBookYear').value;
	let isComplete = document.getElementById('inputBookIsComplete').checked;

    let storage = {
        id: +new Date(),
        title : title,
        author : author,
        year : year,
        isComplete : isComplete
    };
    book.push(storage);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(book));
    
    Display_books(book);

        
}


function Display_books(book){
    let CompleteBook = document.getElementById('completeBookshelfList');
    let unCompleteBook = document.getElementById('incompleteBookshelfList');
  

    CompleteBook.innerHTML = "";
    unCompleteBook.innerHTML = "";
    
    for(let i = 0;i< book.length;i++ ){
        
        const Container = document.createElement("article");
        Container.classList.add("book_item");
        let title_container = document.createElement('h3');
        let author_container = document.createElement('p');
        let year_container = document.createElement('p');
        
        title_container.innerHTML = book[i].title;
        author_container.innerHTML = "Penulis : " +book[i].author;
        year_container.innerHTML = "Tahun : " +book[i].year;

        const Editbutton = document.createElement("button");
        Editbutton.classList.add("edit");
        Editbutton.addEventListener("click",function(){
            document.querySelector(".popup").style.display = "flex";
            document.getElementById('inputBookTitle1').value = book[i].title;
            document.getElementById('inputBookAuthor1').value =book[i].author;
            document.getElementById('inputBookYear1').value = book[i].year;
            document.getElementById('inputBookIsComplete1').checked = book[i].isComplete;
            id = i;

            
        });
        Editbutton.innerHTML = "Edit";
        
        Container.append(title_container,Editbutton ,author_container,year_container);
        
        const button = document.createElement("div");
        button.classList.add("action");

        
    
    if (book[i].isComplete == false){
        

        const Greenbutton = document.createElement("button");
        Greenbutton.classList.add("green");
        Greenbutton.addEventListener("click",function(){Done(i)})
        Greenbutton.innerHTML = "Selesai di baca";

        

        const Redbutton = document.createElement("button");
        Redbutton.classList.add("red");
        Redbutton.addEventListener("click",function(){Remove(i)})
        Redbutton.innerHTML = "Hapus buku";

        button.append(Greenbutton,Redbutton);
        Container.append(button);

       
        unCompleteBook.append(Container);


    }else{
        const Greenbutton = document.createElement("button");
        Greenbutton.classList.add("green");
        Greenbutton.addEventListener("click",function(){NotDone(i)});
        Greenbutton.innerHTML = "Belum selesai di baca";

        const Redbutton = document.createElement("button");
        Redbutton.classList.add("red");
        Redbutton.addEventListener("click",function(){Remove(i)})
        Redbutton.innerHTML = "Hapus buku";

        button.append(Greenbutton,Redbutton);
        Container.append(button);


        
        
        CompleteBook.append(Container);
    }
    }
}


document.getElementById('bookSubmit').addEventListener('click',function(event){
    event.preventDefault();
    
    makeNewBooks();
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
});



const Find = document.getElementById("searchSubmit");
Find.addEventListener('click', () =>{
	event.preventDefault();
	
	const searchValue = document.getElementById("searchBookTitle");
	const FindArticle = document.querySelectorAll('article');
	
    if(searchValue.value ==null || searchValue.value == ''){
        Display_books(book)
    }else{
	for(article of FindArticle) {
		if(article != ''){
            let str = article.childNodes[0].innerText;
			if( str.includes( searchValue.value))
                article.removeAttribute('hidden');
			else 
				
                article.setAttribute('hidden', 'hidden');
        }
        
	}
}
});

document.getElementById('bookChange').addEventListener('click',function(){
    
    book[id].title = document.getElementById('inputBookTitle1').value
    book[id].author = document.getElementById('inputBookAuthor1').value 
    book[id].year =   document.getElementById('inputBookYear1').value   
    book[id].isComplete  =   document.getElementById('inputBookIsComplete1').checked;


    document.querySelector(".popup").style.display = "none";
    localStorage.setItem(STORAGE_KEY,JSON.stringify(book));
    
    Display_books(book);
                
    
});


