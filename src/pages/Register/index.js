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
    const [birthdate, setBirthdate] = useState('');
    const [workdate, setWorkdate] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [institution, setInstitution] = useState('');
    const [graduationlvl, setGraduationlvl] = useState('');
    const [graduationinstitution, setGraduationinstitution] = useState('');
    const [latteslink, setLatteslink] = useState('');

    const history = useHistory();

    //integração com o back-end
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name, 
            password,
            email, 
            birthdate,
            workdate, 
            city, 
            uf,
            institution,
            graduationlvl,
            graduationinstitution,
            latteslink
        };
        
        try{
                //axios já envia em json
            await api.post('researchers', data);

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
                    <p>Faça seu cadastro, entre na plataforma, publique seu projeto e encontre outros de seu interesse!</p>

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
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Data de Nascimento"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                    />
                    <input 
                        placeholder="Periodo de trabalho"
                        value={workdate}
                        onChange={e => setWorkdate(e.target.value)}
                    />
                    <input 
                        placeholder="Cidade" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                 
                   
                    <button className="button" type="submit">Cadastrar</button>
                    

                </form>
                <form onSubmit={handleRegister} id = "form2">
                
                <input 
                        placeholder="Estado" 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    <input 
                        placeholder="Instituição" 
                        value={institution}
                        onChange={e => setInstitution(e.target.value)}
                        />
                     <input 
                        placeholder="Nivel de graduação" 
                        value={graduationlvl}
                        onChange={e => setGraduationlvl(e.target.value)}
                        />
                    
                    <input 
                        placeholder="Instituição da graduação" 
                        value={graduationinstitution}
                        onChange={e => setGraduationinstitution(e.target.value)}
                        />
                     <input 
                        placeholder="Link Lattes" 
                        value={latteslink}
                        onChange={e => setLatteslink(e.target.value)}
                        />
                </form>
                
            </div>
        </div>
    );
}