import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const jugadoresService = {
    // Retorna todos los jugadores;
    getJugadores$() {
        return AXIOS.get(`${URL_API}/jugadores?apikey=${API_KEY}&q={}&sort=ordenPos&dir=1`);
    }
}