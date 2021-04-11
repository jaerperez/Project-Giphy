const apiKey = 'EapKeNprg8BFJKA8UTk19tF73ar1hmk6';
let search = document.getElementById('search');
let suggestions = document.querySelector('.suggestions');

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
            suggestions.innerHTML="";
            response.data.forEach(element => {
                let nodo = document.createElement('li');
                let nodospan = document.createElement('p');
                nodospan.classList.add('gifs');
                nodospan.innerHTML = element.name;
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
