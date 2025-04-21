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

    getBook(id) {
      return axios.get(`${this._baseURL}/books/${id}`, { headers: this._getAuthorizationHeaders() })
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

    async deleteBook (id) {
      try {
        const res = await axios.delete(`${this._baseURL}/books/${id}`, { headers: this._getAuthorizationHeaders() });
        return res.data;
      } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : error.message}`);
      }
    }

    updateBook(id, { title, author, genre, publishedYear,avaliableCopies, description }) {
      if (!id) {
        return Promise.reject("O ID é obrigatório.");
      }

      const updatedFields = {};

       if (title !== undefined) updatedFields.title = title;
       if (author !== undefined) updatedFields.author = author;
       if (genre !== undefined) updatedFields.genre = genre;
       if (publishedYear !== undefined) updatedFields.publishedYear = publishedYear;
       if (avaliableCopies !== undefined) updatedFields.avaliableCopies = avaliableCopies;
       if (description !== undefined) updatedFields.description = description;
    
      return axios.patch(`${this._baseURL}/books/${id}`, updatedFields, { headers: this._getAuthorizationHeaders() })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
        });
    }

}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };