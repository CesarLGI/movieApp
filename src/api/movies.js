import {API_HOST,API_KEY,LANG} from '../utils/constants';

export function obtenerNuevasPeliculasApi(page=1){
    const url=`${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    //console.log(url);
    return fetch(url).then((response)=>{
        //console.log(response);
        return response.json();
    }).then((result)=>{
        //console.log(result);
        return result;
    })
}

export function obtenerGeneroPeliculaApi(idGenero){
    const url=`${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response)=>{

        return response.json();

    }).then((result)=>{
        const arrayGenres=[];
        idGenero.forEach((id)=>{
            result.genres.forEach((item)=>{
                if(item.id === id) arrayGenres.push(item.name)
            });
        });
        return arrayGenres;
    })
}

export function obtenerGenerosApi(){
    const url=`${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}
export function obtenerPeliculaGeneroApi(idGenero){
    const url=`${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenero}&language=${LANG}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}
export function obtenerPeliculaXIdApi(idPelicula){
    const url=`${API_HOST}/movie/${idPelicula}?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}

export function obtenerVideoPeliculaApi(idPelicula){
    const url=`${API_HOST}/movie/${idPelicula}/videos?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}
export function obtenerPeliculasPopularesApi(page=1){
    const url=`${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}

export function buscarPeliculaApi(texto){
    const url=`${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${texto}`;
    return fetch(url).then((response)=>{
        return response.json();
    }).then((result)=>{
        return result;
    })
}