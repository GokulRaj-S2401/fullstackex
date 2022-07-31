let searchterm = 'css';

const createTag = element => document.createElement(element);

const getData = () =>{
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchterm}`)
    .then((res)=>res.json())
    .then((data)=>{
        data.items.map((data)=>{
            let card =  createTag('div');
            card.className = 'card';
            
            let head = createTag('div');
            head.className = 'head';
            let img = createTag('img');
            img.src = data.volumeInfo.imageLinks.thumbnail; 
            head.appendChild(img);
            card.appendChild(head);
            
            let body = createTag('div');
            body.className = 'body';
            let title = createTag('p');
            title.textContent = data.volumeInfo.title;
            let link = createTag('a');
            link.href = data.volumeInfo.previewLink;
            link.textContent = 'view';
            link.target = 1;
            body.appendChild(title);
            body.appendChild(link)
            card.appendChild(body);
            document.getElementById('bookContainer').appendChild(card)
        });
    });

}

getData();


document.getElementById('searchForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    let value = document.getElementById('search').value;
    if( value <1){
        alert('please enter valid queries');
    }
    else{

        let container = document.getElementById('bookContainer');
        while(container.firstElementChild){
            container.removeChild(container.firstElementChild);
        }
        searchterm = value;
        getData();
    }
});