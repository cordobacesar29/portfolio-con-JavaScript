// variables
const salida = document.querySelector('#salida');
const microphone = document.querySelector('#microphone');
const formulario = document.querySelector('#formulario');

microphone.addEventListener('click', ejecutarAPI);

document.addEventListener('DOMContentLoaded', () => {
formulario.addEventListener('submit', validarBusqueda);
});

function isMobile() {
    if (sessionStorage.desktop)
        return false;
    else if (localStorage.mobile)
        return true;
    let mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var i in mobile)
        if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
    return false;
}

function validarBusqueda(e) {
    e.preventDefault();
    const submit = document.querySelector('#submit');
    const busqueda = document.querySelector('#busqueda').value;
    
    if ( busqueda.length !== 0 ) {
        submit.addEventListener('click', enviarDatos);
        return;  
    }
    error();
}

function error() {
    alert('error ingrese más campos');
}

function enviarDatos() {

    const urlDesktop = `https://api.whatsapp.com/`;
    const urlMobile = `whatsapp://`;
    const message = `send?phone=5493815350632&text=${busqueda.value}`;

    if ( isMobile() ) {
        window.open( urlMobile + message, '_blank');
    } else {
        window.open( urlDesktop + message, '_blank');
    }
}

function ejecutarAPI() {
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function() {
        salida.classList.add('mostrar');
        salida.textContent = 'Escuchando';
    };

    recognition.onspeechend = function() {
        salida.textContent = 'Se dejó de grabar';
        recognition.stop();
    };

    recognition.onresult = function(e) {
        
        const transcript = e.results[0][0];
        
        busqueda.value = transcript.transcript;

        setTimeout( () => {
            salida.classList.remove('mostrar');
        }, 4000 );
    };
}