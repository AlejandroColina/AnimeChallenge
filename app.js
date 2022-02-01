const url = 'https://api.jikan.moe/v3';

//------------------------------------API RECOMMENDATIONS-------------------------------------------------

const toPlayList = document.getElementById('playList');
async function moreViews () {

    const link = await fetch(url + "/anime/1/recommendations");
    const data = await link.json();
    const info = data.recommendations;
    
    info.forEach(element => {

        const divContenedor = document.createElement('div');
        divContenedor.className = 'div-playList';
        
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
       const consultaUsuario = document.getElementById('search').value.toLowerCase(); 
       search3 = consultaUsuario;                                       // Guardo el value ingresado por el usuario
       
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
    document.querySelector('h1').remove();

    e.slice(0, 10).forEach(element => {                                 // Aquí se filtra la cantidad de tarjetas
        const divContenedor = document.createElement('div');//ppal
        divContenedor.className = "div-ppal-search";//ppal
        
        const divImg = document.createElement('div');//div-hijo-img
        divImg.className = 'div-img-search';//div-hijo-img
        
        const divH4 = document.createElement('div');
        divH4.className = 'div-score-search';

        const img = document.createElement('img');  
        const link = document.createElement('a');
        const score = document.createElement('h4');

            if(element.score >=1 && element.score <5){
                score.innerHTML = 'I do not recommend it.'
            }else if(element.score >=5 && element.score<8){
                score.innerHTML = 'You may have fun.'
            }else{
                score.innerHTML = 'Great, this is one of the best anime.'
            }
        
        img.src = element.image_url;
        img.className = "img-search";                                   //Se asigna clase para darle margen en los estilos
        
        link.href = element.url;

        link.appendChild(img);

        divImg.appendChild(link);//divImg
        divH4.appendChild(score);

        divContenedor.append(divImg, divH4);
        //divContenedor.appendChild(divH4);
        toHTML.append(divContenedor);

        //fragment.append(divContenedor);
    
    });

    document.querySelectorAll('p')[0].innerHTML = 
    `Requesting: <a href="${url}${search1}${search3}${search2}}"> ${url}${search1}${search3}</a>`;
    document.querySelector('h2').innerHTML= 'RESULT';
    document.querySelectorAll('p')[1].innerHTML = `Request Cached: ${request_cached}`;         
    
    //toHTML.append( fragment);
    
}
//---------------------------------------------------------------------------------

