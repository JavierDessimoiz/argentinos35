import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const partidoService = {
    // Retorna los ultimos dos partidos, ultimo resultado y proximo partido;
    getUltimosDosPartido$() {
        //const query = `{"idcliente":${clienteId},"moneda":"${monedaId}"}`;
        return AXIOS.get(`${URL_API}/partidos?apikey=${API_KEY}&q={}&max=2&sort=fecha&dir=-1`);
    },
    // Nuevo partido;
    postPartido$(nuevoPartido) {
        return AXIOS.post(`${URL_API}/partidos?apikey=${API_KEY}`, nuevoPartido);
    },
    getPartidoById$() {
        //const query = `{"_id":"${_Id}"}`;
        return AXIOS.get(`${URL_API}/partidos?apikey=${API_KEY}&q={query}`);
    },
	//actualiza datos de un partido
	updatePartido(id,entity){
        return AXIOS.put(`${URL_API}/partidos/${id}?apikey=${API_KEY}`,entity);
    },
    //Elimina un partido
    deletePartido(id){
        return AXIOS.delete(`${URL_API}/partidos/${id}?apikey=${API_KEY}`);
    },
    //goleadores de un partido
    getGolesPatido$(id) {
        return AXIOS.get(`${URL_API}/partidos/${id}/goles?apikey=${API_KEY}`);
    },
    //Sedes
    getSedes$() {
        return AXIOS.get(`${URL_API}/sedes?apikey=${API_KEY}&h={"$orderby": {"nombre": 1}}`);
    },
    //Rivales
    getRivales$() {
        return AXIOS.get(`${URL_API}/rivales?apikey=${API_KEY}&h={"$orderby": {"nombre": 1}}`);
    },
    // trae los partidos
    getPartidos$() {
        //const query = `{"idcliente":${clienteId},"moneda":"${monedaId}"}`;
        return AXIOS.get(`${URL_API}/partidos?apikey=${API_KEY}&q={}&sort=fecha&dir=-1`);
    },
}