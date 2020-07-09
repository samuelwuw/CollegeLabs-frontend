import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register(){
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    //integração com o back-end
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name, 
            password,
            email, 
        };
        
        try{
                //axios já envia em json
            const response = await api.post('citizens', data);

            alert(`Seu id de acesso: ${response.data.id}`);

            history.push('/');
        }catch(err){
            alert('Erro no cadastro, verifique se as informações são válidas. ');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, explore as pesquisas de seu interesse!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#E02041' />
                        Menu Principal
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                     <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />          
                   
                    <button className="button" type="submit">Cadastrar</button>
                  
                </form>
                                
            </div>
        </div>
    );
}