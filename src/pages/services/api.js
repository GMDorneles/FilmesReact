import axios from 'axios';
 //https://sujeitoprogramador.com/r-api/?api=filmes/
  //r-api/?api=filmes/(todos os filmes)
  // //https://sujeitoprogramador.com/r-api/?api=filmes/123 (filme com id 123)
const api = axios.create({
    baseURL:'https://sujeitoprogramador.com'
});
export default api;