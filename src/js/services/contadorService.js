import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';


export const contadorService = {
    getContador$() {
        return AXIOS.get(`${URL_API}/contadores?apikey=${API_KEY}&q={}&max=1`);
    },
    //updateContador$(id,contador){
    //    return AXIOS.put(`${URL_API}/contadores/${id}?apikey=${API_KEY}`,contador);
    //},
    updateContador$(id,contador){
        console.log(id);
        console.log(contador);
        return null;
    }
}