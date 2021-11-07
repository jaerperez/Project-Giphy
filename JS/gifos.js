const apiKey = 'EapKeNprg8BFJKA8UTk19tF73ar1hmk6';
const search = document.getElementById('search');
const suggestions = document.getElementById('input-suggestions');
const icon1 = document.getElementById('icon-input0');
const icon2 = document.getElementById('icon-input2');
const glassearch = document.querySelector('.icon-input2');
const resultsgiphy = document.querySelector('.results-list');
const resultsgiphyrec = document.querySelector('.trending-list');
const buttonseemore = document.querySelector('.myButton');
const resultspopup = document.querySelector('.modal-content');
const giphymax = document.querySelector('.gif-popup-div');
const favlist=document.querySelector('.results-fav-list');


//==================endpoint gifos=================================================================================
let count = 12;
async function endpointgiphy(e, point) {
    let endpointselect = "";
    switch (point) {
        case 1:
            const endpoint = 'https://api.giphy.com/v1/gifs/search/tags?api_key=' + apiKey + '&q=' + e + '&limit=8&offset=0';
            endpointselect = endpoint;
            break
        case 2:
            const endpoint2 = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + e + '&limit=' + count + '&offset=0';
            endpointselect = endpoint2;
            break
        case 3:
            const endpoint3 = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=12';
            endpointselect = endpoint3;
            break
        default:
            console.log('option incorrect');
    }
    const resp = await fetch(endpointselect);
    const data = await resp.json();
    return data;
}

//=================The words are searched for endpoint autocomplete==================================================


function funsearch(e) {
    if (e.target.value == "") {
        const clear = "";
        suggestions.innerHTML = clear;
        icon1.setAttribute('class', 'icon-input0');
        icon2.setAttribute('class', 'icon-input2');
    } else {
        icon2.setAttribute('class', 'icon-input1');
        icon1.setAttribute('class', 'icon-input2');

        let info = endpointgiphy(e.target.value, 1);
        let i = 0;
        info.then(response => {
            const allitems = [];
            suggestions.innerHTML = "";
            response.data.forEach(element => {
                i++;
                let nodo = document.createElement('li');
                nodo.setAttribute('id', 'suggest-' + i);
                nodo.addEventListener('click', copywordsuggest);

                let nodoico = document.createElement('img');
                nodoico.setAttribute('class', 'fas');

                let nodospan = document.createElement('p');
                nodospan.innerHTML = element.name;

                nodo.appendChild(nodoico);
                nodo.appendChild(nodospan);
                allitems.push(nodo);
            });
            suggestions.append(...allitems);
        })
    }
}

function copywordsuggest() {
    const id = this.getAttribute('id');
    const elementp = document.querySelector("#" + id + ">p");
    const valuep = elementp.innerHTML;
    search.value = valuep;
    const clear = "";
    suggestions.innerHTML = clear;
    icon1.setAttribute('class', 'icon-input0');
    icon2.setAttribute('class', 'icon-input2');
    searchmain();
}


if(search!=null){
    search.addEventListener('keyup', funsearch);
}

//======================Autocomplete finish========================================================================


//======================Search Gifos===============================================================================
const allitems = []; //main search items 
function searchmain() {
    let word = search.value;
    resultsgiphy.innerHTML = "";
    searchgiphys(word,2,allitems,resultsgiphy);
    //button 
    buttonseemore.style.display = "block";
    suggestions.innerHTML = "";
    count = count * 2;
}


function searchgiphys(sgiphy,numendpoint,array,nodoprincipal) {
    let sword = endpointgiphy(sgiphy, numendpoint);
    sword.then(response => {
        array.length = 0;
        let i = 0;
        response.data.forEach(element => {
            i++;
            cardsgiphy(i,array,element,element.images.original.url);
        });
        nodoprincipal.append(...array);
    })
}


function cardsgiphy(i,array,element,urlGify){
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
    optionfav.setAttribute('id', 'gif-option-fav-' + i);
    optionfav.setAttribute('value', '0');
    const idelement = 'gif-option-fav-' + i;
    optionfav.addEventListener('click', () => {
        checkFavs(element, optionfav, idelement);
    });

    //option download
    let optiondow = document.createElement('li');
    optiondow.setAttribute('class', 'gif-option-dow');

    //create hipervinculo
    let optiondowurl = document.createElement('a');
    optiondowurl.setAttribute('class', 'url');
    let href = createBlob(urlGify);
    href.then(url => { optiondowurl.setAttribute("href", url); });
    optiondowurl.setAttribute('download', 'descargagifo');

    //link image

    let optionurllink = document.createElement('div');
    optionurllink.setAttribute('class', 'gif-option-dow-link');

    //Option Max 
    let optionmax = document.createElement('li');
    optionmax.setAttribute('class', 'gif-option-max');
    optionmax.addEventListener('click', () => {
        let this_gif_string = JSON.stringify(element);
        popup(this_gif_string, i);
        window.scrollTo(0, 0);
    })

    //Content user name
    let name = document.createElement('div');
    name.setAttribute('class', 'namecont');
    let nametitle = document.createElement('p');
    nametitle.innerHTML = "User";
    let namegif = document.createElement('p');
    namegif.setAttribute('class', 'name-gif');
    namegif.innerHTML = element.title;
    name.appendChild(nametitle);
    name.appendChild(namegif);


    //Gif 
    let nodoimg = document.createElement('img');
    nodoimg.setAttribute('src', urlGify);
    nodoimg.setAttribute('class', 'gif-img');

    optiondowurl.appendChild(optionurllink);
    optiondow.appendChild(optiondowurl);
    nodooption.appendChild(optionfav);
    nodooption.appendChild(optiondow);
    nodooption.appendChild(optionmax);
    nodohover.appendChild(nodooption);
    nodohover.appendChild(name);

    nodo.appendChild(nodohover);
    nodo.appendChild(nodoimg);
    array.push(nodo);
}




if(glassearch!=null){
   glassearch.addEventListener('click', searchmain);
}

buttonseemore.addEventListener('click', searchmain);
//searchitemsugges.addEventListener('click', searchminor);

async function createBlob(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.log("ERROR: ", error);
    }
}




//Check favorite 
//Add favorites 
var List_fav = [];

//Object for elements 
const allitemspopup = [];

//Function max of each giphy 
function popup(elementpop, id) {
    let gif_json = JSON.parse(elementpop);
    //Principal content 
    let nodo = document.createElement('div');
    nodo.setAttribute('class', 'gif-popup-div');

    let exit = document.createElement('div');
    exit.setAttribute('class', 'gif-popup-exit');
    exit.addEventListener('click', () => {
        console.log(allitemspopup);
        document.querySelector(".gif-popup-div").remove();
        allitemspopup.splice(0, 1);
        resultspopup.style.display = "none";

    })

    //Imagen content 
    let nodocontimg = document.createElement('div');
    nodocontimg.setAttribute('class', 'gif-popup-img-content');
    //imagen
    let nodoimg = document.createElement('img');
    nodoimg.setAttribute('src', gif_json.images.original.url);
    nodoimg.setAttribute('class', 'gif-popup-img');

    nodocontimg.appendChild(nodoimg);

    // options giphy
    let nodooption = document.createElement('ul');
    nodooption.setAttribute('class', 'gif-popup-option');

    //Option favorite 
    let optionfavmax = document.createElement('li');
    optionfavmax.setAttribute('class', 'gif-option-fav');
    optionfavmax.setAttribute('id', 'gif-option-fav-mx' + id);
    optionfavmax.setAttribute('value', '0');
    markFromFavs(gif_json.images.original.url, optionfavmax);//Mark the favorites
    const idelement = 'gif-option-fav-mx' + id;
    optionfavmax.addEventListener('click', () => {
        checkFavs(gif_json, optionfavmax, idelement);
    });

    //option download
    let optiondow = document.createElement('li');
    optiondow.setAttribute('class', 'gif-option-dow');
    //create hipervinculo
    let optiondowurl = document.createElement('a');
    optiondowurl.setAttribute('class', 'url');
    let href = createBlob(gif_json.images.original.url);
    href.then(url => { optiondowurl.setAttribute("href", url); });
    optiondowurl.setAttribute('download', 'descargagifo');
    //link image
    let optionurllink = document.createElement('div');
    optionurllink.setAttribute('class', 'gif-option-dow-link');

    optiondowurl.appendChild(optionurllink);
    optiondow.appendChild(optiondowurl);

    nodooption.appendChild(optionfavmax);
    nodooption.appendChild(optiondow);

    //Content user name
    let name = document.createElement('div');
    name.setAttribute('class', 'popup-namecont');
    let nametitle = document.createElement('p');
    nametitle.innerHTML = "User";
    let namegif = document.createElement('p');
    namegif.setAttribute('class', 'popup-name-gif');
    namegif.innerHTML = gif_json.title;
    name.appendChild(nametitle);
    name.appendChild(namegif);

    nodo.appendChild(exit);
    nodo.appendChild(nodocontimg);
    nodo.appendChild(nodooption)
    nodo.appendChild(name);

    allitemspopup.push(nodo);
    resultspopup.append(...allitemspopup);
    resultspopup.style.display = "block";
}


//Mark favorite max sss
function markFromFavs(urlfav, node) {
    let allfav = JSON.parse(localStorage.getItem("favs-id"));
    if (allfav.length > 0) {
        for (let i = 0; i < allfav.length; i++) {
            //let gif_object = JSON.parse(allfav[i]);
            //console.log("Localstorage : " + gif_object.images.original.url + "URL del giphy " + urlfav);
            if (allfav[i].images.original.url === urlfav) {
                node.setAttribute('class', 'gif-option-fav-selec');
                node.setAttribute('value', '1');
            }
        }
    }
}

function checkFavs(elementpop, node, e) {
    const date = document.getElementById(e).value;
    let list_favorites2 = JSON.parse(localStorage.getItem("favs-id"));
    if (date === 0) {
        newfavs(elementpop, node);
    } else {
        addfavs(list_favorites2, elementpop, node);
    }
}

function newfavs(elementfav, node) {
    List_fav.push(elementfav);
    let stringified = JSON.stringify(List_fav);
    localStorage.clear();
    localStorage.setItem('favs-id', stringified);
    node.setAttribute('class', 'gif-option-fav-selec');
    node.setAttribute('value', '1');
}

function addfavs(list, elementfav, node) {
    for (let i = 0; i < list.length; i++) {
        console.log("Localstorage : " + list[i].images.original.url + "URL del giphy " + elementfav.images.original.url);
        if (list[i].images.original.url === elementfav.images.original.url) {
            list.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("favs-id", JSON.stringify(list));
            node.setAttribute('class', 'gif-option-fav');
            node.setAttribute('value', '0');
            location.reload();
        }
    }
}

//===================Fin search giphy=======================================================//

function checkForAddedFavs() {
    if (localStorage.getItem('favs-id')) {
        List_fav = JSON.parse(localStorage.getItem('favs-id'));
    } else if (localStorage.getItem('favs-id') == null) {
        List_fav = [];
    }
    return List_fav;
}
checkForAddedFavs();

//================== Recommended trending giphys=========================================
const allitemsre = []; //recommended items 

function giphytrendings() {
    searchgiphys("N/A",3,allitemsre,resultsgiphyrec);
}

giphytrendings();

let btn_slide_left = document.getElementById("slide-btn-left");
let btn_slide_right = document.getElementById("slide-btn-right");
btn_slide_right.addEventListener('click', () => {
    resultsgiphyrec.scrollBy({left: 500, behavior: 'smooth'});
    btn_slide_right.setAttribute('src','../assets/button-slider-right-hover.svg');
    btn_slide_left.setAttribute('src','../assets/button-slider-left.svg');
});

btn_slide_left.addEventListener('click', () => {
    resultsgiphyrec.scrollBy({left: -500, behavior: 'smooth'});
    btn_slide_right.setAttribute('src','../assets/button-slider-right.svg');
    btn_slide_left.setAttribute('src','../assets/button-slider-left-hover.svg');
});

//===================Page my favorites=====================//


const allitemsfav=[];// all items show in favorites 

function showfavlist(){
    let list_fav3 = JSON.parse(localStorage.getItem("favs-id"));
    if(list_fav3!==null){
        allitemsfav.length=0;
        let i = 0;
        list_fav3.forEach(element => {
            i++;
            cardsgiphy(i,allitemsfav,element,element.images.original.url);
        });
        favlist.append(...allitemsfav);
        markfav();
    }
}

function markfav(){
    for (let i = 1; i < allitemsfav.length+1; i++) {
        let elementfavorite=document.getElementById('gif-option-fav-'+i);
        elementfavorite.setAttribute('class', 'gif-option-fav-selec');
        elementfavorite.setAttribute('value', '1');
        }
}

addEventListener('DOMContentLoaded',showfavlist());
//===================Page my favorites=====================//




