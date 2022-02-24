import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const RestService = {
    // Retorna videos para la seccion videos
    getGaleria$() {
        return AXIOS.get(`${URL_API}/galeria-fotos?apikey=${API_KEY}&sort=id&dir=-1`);
    },
    // Retorna fotos de presentacion
    getPresentacion$() {
        return AXIOS.get(`${URL_API}/fotos-nosotros?apikey=${API_KEY}`);
    },
    // Retorna los videos
    getVideo$() {
        return AXIOS.get(`${URL_API}/videos?apikey=${API_KEY}`);
    },
    // Retorna los ultimos dos partidos, ultimo resultado y proximo partido;
    getPartido$() {
        return AXIOS.get(`${URL_API}/partidos?apikey=${API_KEY}`);
    }
    
}