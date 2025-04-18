import axios from 'axios';
import * as token from "./token.js";

class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    _getAuthorizationHeaders() {
      return {
        ...this._headers,
        authorization: `Bearer ${token.getToken()}`,
      }
    }

    getBooks() {
        return axios.get(`${this._baseURL}/books`, { headers: this._getAuthorizationHeaders() })
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    createBook(bookData) {
      const { title, author, genre, publishedYear, description } = bookData;

      if (!title || !author || !genre || !publishedYear || !description) {
        return Promise.reject("Todos os campos são obrigatórios.");
      }

       return axios.post(`${this._baseURL}/books`, bookData, { headers: this._getAuthorizationHeaders() })
       .then((res) => {
        return res.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }

    async deleteProduct (id) {
      try {
        const res = await axios.delete(`${this._baseURL}/products/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : error.message}`);
      }
    }

}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };