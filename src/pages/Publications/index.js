import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2, FiEdit, FiUsers, 
    FiCornerDownLeft, FiThumbsUp, FiUpload, FiDownload, FiThumbsDown} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [pubs, setPubs] = useState([]);
    const [pubUpload, setPubUpload] = useState([]);

    const history = useHistory();

    const researcherId = localStorage.getItem('researcherId');
    const researcherName = localStorage.getItem('researcherName');

    //recebe qual função deseja ser executada, e quando ela será executada
    //toda vez que as informações do array mudarem, ele executa a função
    useEffect(() => {
        api.get('profilePublications',{
            headers: {
                Authorization: researcherId,
            }
        }).then(response => {
            setPubs(response.data);
        })      
    }, [researcherId]);

    
    //funções com handle no começo interagem com algo do usuário
    async function handleDeletePub(id){
        try{
            await api.delete(`publications/${id}`, {
                headers: {
                    Authorization: researcherId,
                }
            });

            //faz varredura no array de incidents, procura o que tem o id de delete, e o remove dos incidents
            setPubs(pubs.filter(pub => pub.id !==  id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente. ');
        }
    }

    async function handleToPosts(id){
      try{
          history.push('/Profile');
      }catch(err){
          alert('Erro ao atualizar post, tente novamente. ')
      }
    }

    //arrumar
    async function handleUpdatePub(id){
        try{
            localStorage.setItem("pub_id", id);
            history.push('/publications/update');
        }catch(err){
            alert('Erro ao atualizar post, tente novamente. ')
        }
    }

    async function handleLikePub(id){
        try{
            await api.patch(`publications/${id}`, {
                headers: {
                    Authorization: researcherId,
                }
            });

            await api.get('profilePublications',{
                headers: {
                    Authorization: researcherId,
                }
            }).then(response => {
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

            await api.get('profilePublications',{
                headers: {
                    Authorization: researcherId,
                }
            }).then(response => {
                setPubs(response.data);
            })
        }catch(err){
            alert('Erro ao cancelar like no post, tente novamente. ') 
        }
    }

    //parei aquiiiiii
    async function handleUploadPub(id){
        try{
            await api.post('publicationsFile').then(response => {
                setPubUpload(response.data);
            });

            await api.patch(`publicationsFileName/${id}`, pubUpload.filename);

            console.log(pubUpload.filename);
            
        }catch(err){
            alert('Erro ao enviar arquivo, tente novamente!')
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
                <span>Bem vindo(a) pesquisador(a), {researcherName}</span>

                
                <Link className="button" to="publications/new">Cadastrar nova publicação</Link>
                <button id = "navigationBtn">
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
            <h4>Pesquise membros em {<FiUsers size={15}/>}! </h4>
            <h4>Para fazer upload de uma pesquisa use {<FiUpload size={15}/>}! </h4>
            <h4>Para baixar uma pesquisa use {<FiDownload size={15}/>}! </h4>
            <h1 id="postsTitle">Publicações cadastradas</h1>

            <ul>
                {pubs.map(pub => (
                    <li key={pub.id}>
                        {/* title, local, year, abstract, tags, url, upload, path, researcher_id
 */}
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

                        
                        <button onClick= {() => handleDeletePub(pub.id)} type="button" id="trashBtnPub" title="deletar">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleUpdatePub(pub.id)} type="button" id="updateBtnPub" title="editar">
                            <FiEdit size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleLikePub(pub.id)}type="button" id="likeBtnPub" title="curtir">
                            <FiThumbsUp size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleUnlikePub(pub.id)}type="button" id="unlikeBtnPub" title="curtir">
                            <FiThumbsDown size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleUploadPub(pub.id)}type="button" id="uploadBtnPub" title="upload">
                            <FiUpload size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleLikePub(pub.id)}type="button" id="downloadBtnPub" title="baixar">
                            <FiDownload size={20} color="#a8a8b3" />
                        </button>        
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}