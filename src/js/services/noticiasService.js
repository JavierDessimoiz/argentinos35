import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const noticiasService = {
    // Retorna la ultima noticia;
    getUltimaNoticia$() {
        //const query = `{"idcliente":${clienteId},"moneda":"${monedaId}"}`;
        //
        return AXIOS.get(`${URL_API}/noticias?apikey=${API_KEY}&q={}&max=1&sort=fecha&dir=-1`);
    },
    // Nueva noticia;
    postNoticia$(nuevaNoticia) {
        return AXIOS.post(`${URL_API}/noticias?apikey=${API_KEY}`, nuevaNoticia);
    },
	//actualiza una noticia
	updateNoticia(id,entity){
        return AXIOS.put(`${URL_API}/noticias/${id}?apikey=${API_KEY}`,entity);
    },
    //Elimina una noticia
    deleteNoticia(id){
        return AXIOS.delete(`${URL_API}/noticias/${id}?apikey=${API_KEY}`);
    },

    
}