import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register(){
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [graduation, setGraduation] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    //integração com o back-end
    async function handleRegister(e){
        e.preventDefault();

        const citizen_id = localStorage.getItem('researcherId');

        localStorage.setItem('researcherName', name);

        const data = {
            name, 
            identity,
            birthdate,
            graduation,
            password,
            email, 
        };
        
        try{
            //axios já envia em json
            await api.put(`citizens/${citizen_id}`, data);

            history.push('/profileUser');
        }catch(err){
            alert('Erro no cadastro, verifique se as informações são válidas. ');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="College Labs"/>

                    <h1>Edição</h1>
                    <p>Edite suas informações!</p>

                    <Link className="back-link" to="/profileUser">
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        placeholder="Identidade"
                        value={identity}
                        onChange={e => setIdentity(e.target.value)}
                    />
                    <input 
                        placeholder="Data de nascimento"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                    />
                    <input 
                        placeholder="Nível de graduação"
                        value={graduation}
                        onChange={e => setGraduation(e.target.value)}
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