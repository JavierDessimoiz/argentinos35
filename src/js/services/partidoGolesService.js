import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const partidoGolesService = {
    // Retorna todos los goles de un partido;
    getPartidoGoles$() {
        return AXIOS.get(`${URL_API}/partidogoles?apikey=${API_KEY}&q={}`);
    },
    // Agrega un gol a un partido;
    postPartidoGoles$(nuevoGol) {
        return AXIOS.post(`${URL_API}/partidogoles?apikey=${API_KEY}`, nuevoGol);
    },
    //Elimina gol de un partido
    deleteGolPartidoid(id){
        return AXIOS.delete(`${URL_API}/partidogoles/${id}?apikey=${API_KEY}`);
    },
    //Elimina todos los goles de un partido por id de partido
    deleteGolesPartidoid(id){
        //const query = `{"_parent_id":"${id}"}`;
        return AXIOS.delete(`${URL_API}/partidogoles?apikey=${API_KEY}&q={"_parent_id":"${id}"}}`);
    },
}