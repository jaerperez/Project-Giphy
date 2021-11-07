let btnrecord = document.getElementById('btn-start');
let video_record = document.querySelector('.box-create img');




var status_record = 0;


let list_creategif=[];

function checkMisGiphys(){
    if(localStorage.getItem('myGifkey')==null){
        list_creategif=[];
    }else{
        list_creategif=JSON.parse(localStorage.getItem('myGifkey'));
    }
    return list_creategif;
}

checkMisGiphys();


function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (camera) {
        callback(camera);
    }).catch(function (error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

function stopRecordingCallback() {
    //document.querySelector('h1').innerHTML = 'Gif recording stopped: ' + bytesToSize(recorder.getBlob().size);
    video_record.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    //recorder.destroy();
    //recorder = null;
}

let recorder;
function opencamara() {
    eliminarcard('.gif-waiting-hover');
    captureCamera(function (camera) {
        document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
       
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 190,
            hidden: 140,
            onGifRecordingStarted: function () {
                document.querySelector('h1').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function (gifURL) {
                video_record.src = gifURL;
            }
        });
        recorder.startRecording();
    });
}

function startRecord() {
    recorder.destroy();
    recorder=null;
    captureCamera(function (camera) {
        document.querySelector('h1').innerHTML = 'Waiting for Gif Recorder to start...';
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 190,
            hidden: 140,
            onGifRecordingStarted: function () {
                document.querySelector('h1').innerHTML = 'Gif recording started.';
            },
            onGifPreview: function (gifURL) {
                video_record.src = gifURL;
            }
        });
        recorder.startRecording();
        // release camera on stopRecording
        recorder.camera = camera;
    });

}

function stopRecord() {
    recorder.stopRecording(stopRecordingCallback);
}

function UploadGif() {
    const form = new FormData();    
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));
    gifwaiting();
    fetch('https://upload.giphy.com/v1/gifs?api_key=EapKeNprg8BFJKA8UTk19tF73ar1hmk6', {         
        method: "POST",
        body: form,                
        //mode: 'cors',                              
    })
    .then(response =>response.json())
    .then(result => {        
        console.log(result); 
        let url_src='https://media.giphy.com/media/'+ result.data.id +'/giphy.gif';
        gif_upload(url_src,result.data.id);
        list_creategif.push(result.data);
        localStorage.setItem('myGifkey',JSON.stringify(list_creategif));

    })         
    .catch(error => {
        console.error("Error: ", error)
    })  
}

async function createBlob(url) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.log("ERROR: ", error);
    }
}

btnrecord.addEventListener('click', giphycamara);

function giphycamara() {
    if (status_record == 0) {
        opencamara();
        btnrecord.innerHTML = 'Grabar';
        status_record = 1;
        document.querySelector(".title-p").innerHTML = "";
    } else if (status_record == 1) {
        startRecord();
        btnrecord.innerHTML = 'Stop';
        status_record = 2;
    } else if (status_record == 2) {
        stopRecord();
        btnrecord.innerHTML = 'Subir';
        status_record = 3;
    } else if(status_record == 3){
        UploadGif();
        btnrecord.innerHTML = 'Finalizar';
        status_record = 0;
        //document.querySelector(".gif-waiting-hover").remove();

    }
}

//comenzar, Dar acceso a la camara, grabar, finalizar, subir gifo

const upload_giphy=document.querySelector('.box-create');

function gifwaiting(){
    eliminarcard('.gif-waiting-hover');
    let nodohover = document.createElement('div');
    nodohover.setAttribute('class', 'gif-waiting-hover');
    let nodoimg = document.createElement('img');
    nodoimg.setAttribute('class', 'gif-img-waiting');
    let nametitle = document.createElement('p');
    nametitle.innerHTML = "Estamos subiendo tu GIFO";
    nodohover.appendChild(nodoimg);
    nodohover.appendChild(nametitle);
    upload_giphy.appendChild(nodohover);
}


function gif_upload(url,gif_id){
    eliminarcard('.gif-waiting-hover');
    //document.querySelector(".gif-waiting-hover").remove();

    let nodohover = document.createElement('div');
    nodohover.setAttribute('class', 'gif-waiting-hover');

    // options giphy
    let nodooption = document.createElement('ul');
    nodooption.setAttribute('class', 'gif-create-option');

    //option download
    let optiondow = document.createElement('li');
    optiondow.setAttribute('class', 'gif-option-dow');
    //create hipervinculo
    let optiondowurl = document.createElement('a');
    optiondowurl.setAttribute('class', 'url');
    let href = createBlob(url);
    href.then(urlo => { optiondowurl.setAttribute("href", urlo); });
    optiondowurl.setAttribute('download', 'descargagifo');
    //link image
    let optionurllink = document.createElement('div');
    optionurllink.setAttribute('class', 'gif-option-dow-link');
    optiondowurl.appendChild(optionurllink);
    optiondow.appendChild(optiondowurl);

    //option copy
    let optioncopy = document.createElement('li');
    optioncopy.setAttribute('class', 'gif-option-copy');
    optioncopy.setAttribute('id', 'copyClip');
    optioncopy.setAttribute('data-clipboard-target', 'copyClip');
    optioncopy.addEventListener('click', () => {
        const copyLink = `https://media.giphy.com/media/${gif_id}/giphy.gif`;
        copyurl(copyLink);
    })

    nodooption.appendChild(optiondow);
    nodooption.appendChild(optioncopy);


    let nodoimg = document.createElement('img');
    nodoimg.setAttribute('class', 'gif-img-check');

    let nametitle = document.createElement('p');
    nametitle.innerHTML = "GIFO subido con éxito";

    nodohover.appendChild(nodooption);
    nodohover.appendChild(nodoimg);
    nodohover.appendChild(nametitle);
    upload_giphy.appendChild(nodohover);
    
}



//elimina la card que cubre el giphy creado
function eliminarcard(id){
    let cardhover=document.querySelector(id);
    if(cardhover){
        padre=cardhover.parentNode;
        padre.removeChild(cardhover);
    }
}


function copyurl(url){
    const text = document.createElement('textarea');
    text.value=url;
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
}
