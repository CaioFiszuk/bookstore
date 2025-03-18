import axios from 'axios';

export const BASE_URL = "http://localhost:3000";

export const register = (email, password) => {
    return axios.post(`${BASE_URL}/users/signup`, { email, password }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.data) 
      .catch((error) => {
        if (error.response) {
          throw new Error(`${error.response.status} - ${error.response.data.message || "Erro na requisição"}`);
        } else {
          throw new Error("Erro de conexão: verifique se o servidor está rodando");
        }
      });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if(!res.ok){
      let errorMessage; 

      switch(res.status){
        case 400: 
          errorMessage = "400 - um ou mais campos não foram fornecidos";
          break;
        case 401:
          errorMessage = "401 - o usuário com o e-mail especificado não encontrado";
          break;
        default:
          errorMessage = "Erro";  
      }

      return Promise.reject(errorMessage);
    }

    return res.json();
  });
};