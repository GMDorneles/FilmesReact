import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
export default function Favoritos(){
        const [filmes,setFilmes]=useState([]);
        useEffect(()=>{
            const minhaLista= localStorage.getItem('filmes');
            setFilmes(JSON.parse(minhaLista)||[]);
        },[]);
        function handleDelete(id){
           ///devilve tds os itens menos  o clicado
           let filtroFilmes = filmes.filter((item)=>{
                return(item.id!==id);//reotna com filtro item diferente do clicado  
           }) 
           setFilmes(filtroFilmes);
           localStorage.setItem('filmes',JSON.stringify(filtroFilmes));
        }
    
    return(
        <div id='meus-filmes'>
            <h1>Meus filmes</h1>
            {filmes.length===0 && <span>voce nao possui filmes</span>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>ver detalhe</Link>
                                <button onClick={()=>handleDelete(item.id)}>Excluir</button>{/*funçao anonima faz funciona apensa quando clicado*/}
                            </div>
                        )
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}