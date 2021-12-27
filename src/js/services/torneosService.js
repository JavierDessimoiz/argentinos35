import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';

export const torneosService = {
    //Trae todos los torneos disponibles
    getTorneos$() {
        return AXIOS.get(`${URL_API}/torneos?apikey=${API_KEY}&h={"$orderby": {"año": 1}}`);
    },
}