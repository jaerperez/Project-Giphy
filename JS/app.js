const apiKey = 'EapKeNprg8BFJKA8UTk19tF73ar1hmk6';
let search = document.getElementById('search');
let suggestions = document.querySelector('.suggestions');
let resultsgiphy = document.querySelector('.results');
let lupa = document.getElementById('glass');
let containerresultgiphy = document.querySelector('.containerresults');
let buttonseemore = document.querySelector('.myButton');
let containertreding = document.querySelector('.trending');


//corresponde a la lupa 
let searchitemsugges = document.querySelector('.fas'); //img glass 
let searchitem = document.querySelector('.gifs');//name of giphy




//The words are searched for endpoint autocomplete
async function suggest(e) {
    const endpoint = 'https://api.giphy.com/v1/gifs/search/tags?api_key=' + apiKey + '&q=' + e + '&limit=8&offset=0';
    const resp = await fetch(endpoint);
    const data = await resp.json();
    return data;
}

function funsearch(e) {
    if (e.target.value == "") {
        const clear = "";
        suggestions.innerHTML = clear;
    } else {
        let info = suggest(e.target.value);
        info.then(response => {
            const allitems = [];
            suggestions.innerHTML = "";
            response.data.forEach(element => {
                let nodo = document.createElement('li');
                let nodoico = document.createElement('img');
                nodoico.setAttribute('src', '../assets/icon-search.svg');
                nodoico.setAttribute('class', 'fas');
                let nodospan = document.createElement('p');
                nodospan.classList.add('gifs');
                nodospan.innerHTML = element.name;
                nodo.appendChild(nodoico);
                nodo.appendChild(nodospan);
                allitems.push(nodo);
                console.log(allitems);
            });
            suggestions.append(...allitems);
        })
    }
}

search.addEventListener('keyup', funsearch);
search.addEventListener('change', funsearch);

//==================================Autocomplete finish===================================


//endpoint Search Giphys 
let count = '12';
async function searchword(e) {
    const endpointsearch = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + e + '&limit=' + count + '&offset=0';
    const resp = await fetch(endpointsearch);
    const data = await resp.json();
    console.log(data);
    return data;
}



function searchitemglass() {
    let word = search.value;
    console.log(word);
    let sword = searchword(word);
    sword.then(response => {
        const allitems = [];
        resultsgiphy.innerHTML = "";
        response.data.forEach(element => {
            console.log(response);
            //li content giphy 
            let nodo = document.createElement('li');
            //img 
            let nodoimg = document.createElement('img');
            nodoimg.setAttribute('src', element.images.original.url);
            // icon favorite 
            // let nodoicof = document.createElement('img');
            // nodoicof.setAttribute('src', '../assets/icon-fav-hover.svg');
            // nodoicof.setAttribute('id', 'favorite');
            // icon download 
            // let nodoicod = document.createElement('img');
            // nodoicod.setAttribute('src', '../assets/icon-download-hover.svg');
            // nodoicod.setAttribute('id', 'download');
            // icon zoom 
            // let nodoicoz = document.createElement('img');
            // nodoicoz.setAttribute('src', '../assets/icon-max-hover.svg');
            // nodoicoz.setAttribute('id', 'zoom');
            //div - username
            // let nododivuser=document.createElement('div');
            // nododivuser.setAttribute('id','userd');
            // usarname  
            // let nodouser=document.createElement('p');
            // nodouser.setAttribute('id','user');
            // nodouser.textContent=element.username;
            //div - title giphy 
            // let nododivtitle=document.createElement('div');
            // nododivtitle.setAttribute('id','named');
            //title giphy
            // let nodotitle=document.createElement('p');
            // nodotitle.setAttribute('id','name');
            // nodotitle.textContent=element.title;

            // nododivtitle.appendChild(nodotitle);
            // nododivuser.appendChild(nodouser);
            nodo.appendChild(nodoimg);
            // nodo.appendChild(nodoicof);
            // nodo.appendChild(nodoicod);
            // nodo.appendChild(nodoicoz);
            // nodo.appendChild(nododivuser);
            // nodo.appendChild(nododivtitle);
            allitems.push(nodo);
            console.log(allitems);
        });
        resultsgiphy.append(...allitems);
        //button 
        buttonseemore.style.display = "block";
        suggestions.innerHTML = "";
        count = count * 2;
    })
}

lupa.addEventListener('click', searchitemglass);
buttonseemore.addEventListener('click', searchitemglass);
//===================Fin search giphy=======================================================//


//Endpoint trending
async function searchtrending() {
    const endpointtren = 'https://api.giphy.com/v1/gifs/trending?api_key=EapKeNprg8BFJKA8UTk19tF73ar1hmk6&limit=4&offset=0';
    const resp = await fetch(endpointtren);
    const data = await resp.json();
    console.log(data);
    return data;
}

function searchitemtrending() {
    let sword = searchtrending;
    sword.then(response => {
        const allitems = [];
        response.data.forEach(element => {
            console.log(response);
            //li content giphy 
            let nodo = document.createElement('li');
            //img 
            let nodoimg = document.createElement('img');
            nodoimg.setAttribute('src', element.images.original.url);
            nodo.appendChild(nodoimg);
            allitems.push(nodo);
            console.log(allitems);
        });
        containertreding.append(...allitems);
    })
}

//

function look() {
    let word = searchitem.value;
    let w= searchword(word);
    w.then(response => {
        const allitems = [];
        resultsgiphy.innerHTML = "";
        response.data.forEach(element => {
            console.log(response);
            //li content giphy 
            let nodo = document.createElement('li');
            //img 
            let nodoimg = document.createElement('img');
            nodoimg.setAttribute('src', element.images.original.url);
            nodo.appendChild(nodoimg);
            allitems.push(nodo);
            console.log(allitems);
        });
        resultsgiphy.append(...allitems);
        //button 
        buttonseemore.style.display = "block";
        suggestions.innerHTML = "";
    });
}

searchitemsugges.addEventListener('click',look);

addEventListener('loadstart', searchitemtrending);




