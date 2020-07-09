import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiArchive } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [posts, setPosts] = useState([]);

    const history = useHistory();

    const researcherId = localStorage.getItem('researcherId');
    const researcherName = localStorage.getItem('researcherName');

    //recebe qual função deseja ser executada, e quando ela será executada
    //toda vez que as informações do array mudarem, ele executa a função
    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: researcherId,
            }
        }).then(response => {
            setPosts(response.data);
        })
    }, [researcherId]);

    //funções com handle no começo interagem com algo do usuário
    async function handleDeletePost(id){
        try{
            await api.delete(`posts/${id}`, {
                headers: {
                    Authorization: researcherId,
                }
            });

            //faz varredura no array de incidents, procura o que tem o id de delete, e o remove dos incidents
            setPosts(posts.filter(post => post.id !==  id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente. ');
        }
    }

    async function handleUpdatePost(id){
        try{
            localStorage.setItem("post_id", id);
            history.push('/posts/update');
        }catch(err){
            alert('Erro ao atualizar post, tente novamente. ')
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="College Labs"/>
                <span>Bem vindo pesquisador, {researcherName}</span>

                <Link className="button" to="posts/new">Cadastrar novo post</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Posts cadastrados</h1>

            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <strong>Título:</strong>
                        <p>{post.title}</p>

                        <strong>Texto:</strong>
                        <p>{post.description}</p>

                        <button onClick= {() => handleDeletePost(post.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button onClick= {() => handleUpdatePost(post.id)}type="button" id="updateBtn">
                            <FiArchive size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}