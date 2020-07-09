import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiSearch } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [posts, setPosts] = useState([]);

    const history = useHistory();

    const citizenId = localStorage.getItem('researcherId');
    const citizenName = localStorage.getItem('researcherName');

    //recebe qual função deseja ser executada, e quando ela será executada
    //toda vez que as informações do array mudarem, ele executa a função
    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
        })
    }, [citizenId]);

    //funções com handle no começo interagem com algo do usuário

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="College Labs"/>
                <span>Bem vindo, {citizenName}</span>

                <button id = "navigationButton">
                    <FiSearch size={20}/>
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
                
            </header>
            <h1>Seguindo: </h1>


            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <strong >Título:</strong> 
                        <p>{post.title}</p>

                        <strong >Texto:</strong>
                        <p>{post.description}</p>
                    
                        <strong id="researcherName" >Pesquisador:</strong>
                        <p id="researcherName">{post.name}</p>
                    </li>
                ))}

                
            </ul>
        </div>
    );
}