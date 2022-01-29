const url = 'https://api.jikan.moe/v3';

//------------------------------------API RECOMMENDATIONS-------------------------------------------------

const toPlayList = document.getElementById('playList');
async function moreViews () {

    const link = await fetch(url + "/anime/1/recommendations");
    const data = await link.json();
    const info = data.recommendations;
    
    info.forEach(element => {

        const divContenedor = document.createElement('div');
        const img = document.createElement('img');  
        const link = document.createElement('a');

        img.src = element.image_url;
        link.href = element.url;

        link.appendChild(img);
        divContenedor.appendChild(link);

        toPlayList.append(divContenedor);

    });
}

moreViews();

//------------------------------------------Captura del value del input hecho por el usuario-------------

const search1 = '/search/anime?q=';                                     // Entre estas dos variables se debe inyectar la palabra digitada por el usuario
const search2 = '&page=1';
var search3 = "";                                                       //Guardará en memoria la palabra digitada por el usuaria para inyectarla en la URL que sale en la búsqueda

window.addEventListener('keydown', (event) => {                         //Instancio la búsqueda de usuario
    if(event.keyCode === 13){                                           //Validamos que opriman enter
       const consultaUsuario = document.getElementById('search').value.toLowerCase(); // Guardo el value ingresado por el usuario
       search3 = consultaUsuario;
       
       busqueda(consultaUsuario);                                       //Instancio function que realiza la busqueda y le paso como argumento el value del usuario
        
    }
})

//----------------------------------------Busqueda Por Usuario--------------------------------------------

var request_cached = "";
async function busqueda (userSearch){

    const connection = await fetch ( url + search1 + userSearch + search2 );
    const dataJson = await connection.json();                                  // Aquí tenemos un JSON con los resultados de la consulta
    request_cached = dataJson.request_cached;                             //Variable declarada al principio, se utiliza para imprimir TRUE OR FALSE bajo el input

    if(request_cached){
        cards(dataJson.results);
    } else{
        alert('¡Anime NOT FOUND!');        
          }
}

//----------------------------------------Inyección del Resultado de la búsqueda-------------------------- 

const toHTML = document.getElementById('root');
const fragment = new DocumentFragment();

function cards (e){

    document.getElementById('playList').remove();                       //Quitamos la playList de recomendados para darle lugar al resultado de la búsqueda.
        
    e.slice(0, 10).forEach(element => {                                 // Aquí se filtra la cantidad de tarjetas
        const divContenedor = document.createElement('div');
        divContenedor.className = "div-img";
        const img = document.createElement('img');  
        const link = document.createElement('a');
        
        img.src = element.image_url;
        img.className = "img-search";                                   //Se asigna clase para darle margen en los estilos
        
        link.href = element.url;

        link.appendChild(img);
        divContenedor.appendChild(link);
        fragment.appendChild(divContenedor);
        
        document.querySelectorAll('p')[0].innerHTML = 
        `Requesting: <a href="${url}${search1}${search3}${search2}}"> ${url}${search1}${search3}</a>`;

        document.querySelectorAll('p')[1].innerHTML = `Request Cached: ${request_cached}`;        

    });

   toHTML.appendChild(fragment)
    
}
//---------------------------------------------------------------------------------