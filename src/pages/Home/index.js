import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../services/api';
import './home.css';
export default function Home(){
    //https://sujeitoprogramador.com/r-api/?api=filmes/
   const[filmes, setFilmes]=useState([]);
   useEffect(()=>{
     async function loadFilmes(){
        const response = await api.get('r-api/?api=filmes/')
        //console.log(response);
        setFilmes(response.data);
      }
     loadFilmes();
   },[]);{/**vazio executa ao iniciar a tela */}

    return(
      <div className="container">
          <div className="lista-filmes">
              {filmes.map((filmes)=>{
                return(
                  <article key={filmes.id}>
                      <strong> {filmes.nome}</strong>
                      <img src={filmes.foto} alt={filmes.nome}/>
                      <Link to={`/filme/${filmes.id}`}>Acessar</Link>
                  </article>
                )
              })}
          </div>
      </div>
    );
  }