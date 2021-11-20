const myfavlist=document.querySelector('.results-my-fav-list');

//===================Page my gifos=====================//
const allitemsmyfav=[];

function showmyfavlist(){
    let mylist_fav = JSON.parse(localStorage.getItem("myGifkey"));
    if(mylist_fav!==null){
        allitemsmyfav.length=0;
        let i=0;
        mylist_fav.forEach(e=>{
            i++;
            let url=`https://media.giphy.com/media/${e.id}/giphy.gif`;
            cardsgiphy(i,allitemsmyfav,e,url);
        });
        myfavlist.append(...allitemsmyfav);
        createdelemygify();
    }
}

addEventListener('DOMContentLoaded',showmyfavlist());

//Change the class of favorites to delete
function createdelemygify(){
    for (let i = 1; i < allitemsmyfav.length; i++) {
        let mygify=document.getElementById('gif-option-fav-'+i);
        mygify.setAttribute('class', 'gif-option-delet');
        //mygify.removeEventListener('class',)
        mygify.addEventListener('click', () => {
            deletegifo(allitemsmyfav, allitemsmyfav[i]);
        });
        }
}
//Delete the created gifo
function deletegifo(list, elementfav) {
    for (let i = 0; i < list.length; i++) {
        console.log("Localstorage : " + list[i].id + "URL del giphy " + elementfav.id);
        if (list[i].id === elementfav.id) {
            list.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("myGifoKey", JSON.stringify(list));
            location.reload();
        }
    }
}

//===================Page my gifos=====================/