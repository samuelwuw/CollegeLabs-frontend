import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewIncident(){
    const [theme1, setThemes] = useState('');

    const history = useHistory();

    const researcherId = localStorage.getItem('researcherId'); 

    async function handleThemes(e){
        //previnir comportamento padrão do form, recarregando a pag
        e.preventDefault();

        const data = {
            theme1,  
        };

        console.log(data);
        try{
            await api.patch(`themes/${researcherId}`, data);

            history.push('/profile'); 
        }catch(err){
            alert('Erro ao cadastrar post, tente de novamente. ')
        }
    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Escolha de temas</h1>
                    <p>Escolha seus temas de pesquisa!</p>
                    <a href="http://www.datascienceglossary.org/"><p>Consulte os temas aqui.</p></a>
                    <p>Digite cada um, separando os temas por virgula.</p>
                    <p>Exemplo: algorith, AngularJS.</p>                               

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleThemes}>
                    <textarea 
                        placeholder="Temas"
                        value={theme1}
                        onChange={e => setThemes(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}