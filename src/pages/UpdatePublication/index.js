import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [local, setLocal] = useState('');
    const [year, setYear] = useState('');
    const [abstract, setAbstract] = useState('');
    const [tags, setTags] = useState('');
    const [url, setUrl] = useState('');

    const history = useHistory();

    const researcherId = localStorage.getItem('researcherId'); 

    async function handleUpdatePub(e){
        //previnir comportamento padrão do form, recarregando a pag
        e.preventDefault();

        const pub_id = localStorage.getItem('pub_id');

        const data = {
          title, local, year, abstract, 
          tags, url
        };

        try{
            await api.put(`publications/${pub_id}`, data, {
                headers: {
                    Authorization: researcherId, 
                }
            });

            history.push('/publications'); 
        }catch(err){
            alert('Erro ao editar post, tente de novamente. ')
        }
    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Editar a publicação</h1>
                    <p>Escreva a publicação</p>

                    <Link className="back-link" to="/publications">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para publicações
                    </Link>
                </section>

                <form onSubmit={handleUpdatePub}>

                    <input 
                        placeholder="Título do post"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input 
                        placeholder="Local"
                        value={local}
                        onChange={e => setLocal(e.target.value)}
                    />
                    <input 
                        placeholder="Ano de publicação"
                        value={year}
                        type="number"
                        onChange={e => setYear(e.target.value)}
                    />
                    <input 
                        placeholder="Tags"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                    />
                    <input 
                        placeholder="Link do artigo"
                        value={url}
                        type="url"
                        onChange={e => setUrl(e.target.value)}
                    />

                    <textarea 
                        placeholder="Resumo"
                        value={abstract}
                        onChange={e => setAbstract(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}