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