import AXIOS from "axios";

export const URL_API = 'https://argentinos35-a9d9.restdb.io/rest';
export const API_KEY = '6072fb5ff592f7113340ef20';


export const administradoresService = {
    //Dado un usuario y contraseña retorna un usuario
    getAdministradorByUsuarioAndContrasenia(usuario, contrasenia) {
        const query = `{"usuario": "${usuario}","password": "${contrasenia}"}`;
        return AXIOS.get(`${URL_API}/administradores?apikey=${API_KEY}&q=${query}`);
    }
}