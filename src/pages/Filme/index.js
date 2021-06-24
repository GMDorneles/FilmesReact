import'./filme-info.css';
import {useParams, useHistory} from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';

export default function Filme(){
    const {id}=useParams();//com o nome da rota
    const history = useHistory();

    const[filme,setFilme]=useState([]);
    const [loading, setLoading]=useState(true);//ao entrar na pag ja esta carregando


    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            //id que nao existe, volta para home
            if(response.data.length===0){
                history.replace('/');
                return;
            }

            //passa para o use statefilme
            setFilme(response.data);
            setLoading(false);
        }
        loadFilme();
       
    }, [history, id]);//passa id de alteração
      
    

      function salvaFilme(){
    
        const minhaLista = localStorage.getItem('filmes');
    
        let filmesSalvos = JSON.parse(minhaLista) || [];
    
        //Se tiver algum filme salvo com esse mesmo id precisa ignorar...
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )//some retorna  true  ou false caso tenha o valor passado como parametro
        
        if(hasFilme){
          alert('Você já possui esse filme salvo.');
          return;
          //Para execuçao do código aqui...
        }
        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        alert('Filme salvo com sucesso!');
        return;
    
    
    }
    if(loading){
        return(
            <div className="filme info">
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
           <h1>{filme.nome}</h1>
           <img src={filme.foto} alt={filme.nome}/>
           <h3>Sinopse</h3>
           {filme.sinopse}

           <div className='botoes'>
               <button onClick={salvaFilme}>Salvar</button>
               <button>
                   <a href={`https://www.youtube.com/results?search_query=${filme.nome}Trailer`}>
                       Trailer
                   </a>
               </button> 
           </div>
        </div>
    )
}