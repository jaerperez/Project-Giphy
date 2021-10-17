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
let rute = suggestions.getElementsByTagName('li');
let search_item = suggestions.querySelectorAll('li');




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
        let i = 0;
        info.then(response => {
            const allitems = [];
            suggestions.innerHTML = "";
            response.data.forEach(element => {
                i++;
                let nodo = document.createElement('li');
                nodo.setAttribute('id', i);
                let nodoico = document.createElement('img');
                nodoico.setAttribute('class', 'fas');
                let nodospan = document.createElement('p');
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
    return data;
}


function searchmain() {
    let word = search.value;
    resultsgiphy.innerHTML = "";
    searchgiphys(word);
}

/*function searchminor() {
    var tab = [];
    // add values to the array
    for (var i = 0; i < search_item.length; i++) {
        tab.push(search_item[i].childNodes[1].innerHTML);
    }
    // get selected element index
    for (var i = 0; i < search_item.length; i++) {
        //name of giphy
        search_item[i].childNodes[1].addEventListener('click', Event => {
            searchgiphys(this.innerHTML);
        });

    };

    //let e = suggestions.querySelector('li').getAttribute('id');
    //let searchitem = rute[index].childNodes[1].innerText; //name of giphy
    //console.log('Mira aquí lo que devuelve javier! ' + w);
    resultsgiphy.innerHTML = "";

}*/

const allitems = [];

function searchgiphys(sgiphy) {
    let sword = searchword(sgiphy);
    sword.then(response => {
        allitems.length=0;
        response.data.forEach(element => {
            //Content giphy 
            let nodo = document.createElement('div');
            nodo.setAttribute('class', 'gif-result')
            //contect hover 
            let nodohover = document.createElement('div');
            nodohover.setAttribute('class', 'gif-result-hover')
            
            //Options hover, favorite, max and download
            let nodooption = document.createElement('lu');
            nodooption.setAttribute('class', 'gif-result-option');
            //Option favorite 
            let optionfav = document.createElement('li');
            optionfav.setAttribute('class', 'gif-option-fav');
            //option download
            let optiondow = document.createElement('li');
            optiondow.setAttribute('class', 'gif-option-dow');
            //create hipervinculo
            let optiondowurl = document.createElement('a');
            optiondowurl.setAttribute('class', 'url');
            let href = createBlob(element.images.original.url);
            href.then(url => {optiondowurl.setAttribute("href", url);});
            optiondowurl.setAttribute('download', 'download');
            //Option Max 
            let optionmax = document.createElement('li');
            optionmax.setAttribute('class', 'gif-option-max');
            optionmax.addEventListener('click', () => {
                console.log("entró en gifMAx");
                window.scrollTo(0, 0);
            })

            //Content user name
            let name=document.createElement('div');
            name.setAttribute('class', 'namecont');
            let nametitle=document.createElement('p');
            nametitle.innerHTML="User";
            let namegif=document.createElement('p');
            namegif.setAttribute('class','name-gif');
            namegif.innerHTML=element.title;
            name.appendChild(nametitle);
            name.appendChild(namegif);


            //Gif 
            let nodoimg = document.createElement('img');
            nodoimg.setAttribute('src', element.images.original.url);
            nodoimg.setAttribute('class', 'gif-img');

     
            optiondow.appendChild(optiondowurl);
            nodooption.appendChild(optionfav);
            nodooption.appendChild(optiondow);
            nodooption.appendChild(optionmax);
            nodohover.appendChild(nodooption);
            nodohover.appendChild(name);

            nodo.appendChild(nodohover);
            nodo.appendChild(nodoimg);

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

lupa.addEventListener('click', searchmain);
buttonseemore.addEventListener('click', searchmain);
searchitemsugges.addEventListener('click', searchminor);
//===================Fin search giphy=======================================================//


async function createBlob(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.log("ERROR: ", error);
    }
}




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

/*function look() {
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
}*/
//searchitemtrending();


function searchexample(w) {
    let sword = searchword(w);
    sword.then(response => {
        const allitems = [];
        resultsgiphy.innerHTML = "";
        response.data.forEach(element => {
            console.log(response);
            //li content giphy 
            let nodo = document.createElement('div');
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
            //let nododivtitle = document.createElement('div');
            //nododivtitle.setAttribute('id', 'named');
            //title giphy
            //let nodotitle = document.createElement('p');
            //nodotitle.setAttribute('id', 'name');
            //nodotitle.textContent = element.title;

            //nododivtitle.appendChild(nodotitle);
            // nododivuser.appendChild(nodouser);