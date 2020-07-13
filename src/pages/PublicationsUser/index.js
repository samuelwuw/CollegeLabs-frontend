import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiPower, FiUsers, 
    FiCornerDownLeft, FiThumbsUp, FiDownload, FiThumbsDown } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [pubs, setPubs] = useState([]);

    const history = useHistory();

    const citizenId = localStorage.getItem('researcherId');
    const citizenName = localStorage.getItem('researcherName');

    //recebe qual função deseja ser executada, e quando ela será executada
    //toda vez que as informações do array mudarem, ele executa a função
    useEffect(() => {
        api.get('publications').then(response => {
            setPubs(response.data);
        })
    }, [citizenId]);

    async function handleToPosts(id){
      try{
          history.push('/profileUser');
      }catch(err){
          alert('Erro ao atualizar post, tente novamente. ')
      }
    }


    async function handleLikePub(id){
        try{
            await api.patch(`publications/${id}`, {
            });

            await api.get('publications').then(response => {
                setPubs(response.data);
            });
        }catch(err){
            alert('Erro ao dar like no post, tente novamente. ') 
        }
    }

    async function handleUnlikePub(id){
        try{
            await api.patch(`publicationsUnlikes/${id}`, {
            });

            await api.get('publications').then(response => {
                setPubs(response.data);
            });
        }catch(err){
            alert('Erro ao cancelar like no post, tente novamente. ') 
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

//--------------------------------------------------------------------------html
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="College Labs"/>
                <span>Bem vindo(a), {citizenName}</span>

                
                <button id = "navigationButton">
                    <FiUsers size={20}/>
                </button>
                <button onClick={handleToPosts}id = "navigationBtn">
                    <FiCornerDownLeft size={20}/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
                
            </header>
            <h4>Para acessar a página de posts, use {<FiCornerDownLeft size={15}/>} </h4>
            <h4>Pesquise novos membros em {<FiUsers size={15}/>}! </h4>
            <h1 id="postsTitle">Publicações cadastradas</h1>

            <ul>
                {pubs.map(pub => (
                    <li key={pub.id}>
                        
                        <strong>Pesquisador:</strong>
                        <p>{pub.name}</p>

                        <strong>Título:</strong>
                        <p>{pub.title}</p>

                        <strong>Resumo:</strong>
                        <p>{pub.abstract}</p>

                        <strong>Local de publicação:</strong>
                        <p>{pub.local}</p>

                        <strong>Ano de publicação:</strong>
                        <p>{pub.year}</p>

                        <strong>Tags: </strong>
                        <p>{pub.tags}</p>

                        <strong>Link do artigo: </strong>
                        <p>{pub.url}</p>

                        <strong>Likes:</strong>
                        <p>{pub.likes}</p>                        
                       
                        <button onClick= {() => handleLikePub(pub.id)}type="button" id="likeBtnPubUser" title="curtir">
                            <FiThumbsUp size={20} color="#a8a8b3" />
                        </button>

                        <button onClick= {() => handleUnlikePub(pub.id)}type="button" id="unlikeBtnPubUser" title="curtir">
                            <FiThumbsDown size={20} color="#a8a8b3" />
                        </button>

                        <button onClick= {() => handleLikePub(pub.id)}type="button" id="downloadBtn" title="baixar">
                            <FiDownload size={20} color="#a8a8b3" />
                        </button>        
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}