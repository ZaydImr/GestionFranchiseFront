import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../Assets/logo.png'
import axios from 'axios'
import {useHistory} from 'react-router-dom'   



const Login = () => {
      const [reset,setReset] = useState(true);
      const [username,setUsername] = useState('');
      const [password,setPassword] = useState('');
      const [remember,setRemember] = useState(false);
      const [errorMessage,setErrorMessage] = useState('');
      const [user,setUser] = useState([]);
      const apiUrl = process.env.REACT_APP_API+'Utilisateur/';
      const history = useHistory();

      const handleClick = (e)=>{
            e.preventDefault();
            if(username === '' || password === '')
            {
                  setErrorMessage('Fill the blanks !');                  
                  document.getElementById('username').focus();
            }
            else
            {
                  axios.get(apiUrl+username+'+'+password).then(res=>{
                        if(res.data==='')
                        {
                              setErrorMessage('Informations invalid !!');
                              setPassword('');
                              document.getElementById('username').focus();
                        }
                        else
                        {
                              setUser(res.data);
                        }
                  }).catch(err=>setErrorMessage(err.message));
            }
      }
      const handleChange=()=>{
            setErrorMessage('');
      }

      useEffect(()=>{
            if(user !== [] )
            {
                  if(remember)
                  {
                        document.cookie = 'Utilisateur='+user.login+'; expires='+new Date(9999,1,1).toUTCString();
                        document.cookie = 'typeUtilisateur='+user.typeUtilisateur+'; expires='+new Date(9999,1,1).toUTCString();
                  }
                  if(!remember)
                  {
                        sessionStorage.setItem('Utilisateur',user.login);
                        sessionStorage.setItem('typeUtilisateur',user.typeUtilisateur);
                  }
                  if(user.typeUtilisateur==="Agent")
                        history.push('/agent');
                  else if(user.typeUtilisateur === "Administrateur")
                        history.push('/administrateur');
                  else if(user.typeUtilisateur === "Franchise")
                        history.push('/franchise');
            }
      },[user])

      return (
                  <div className="d-flex justify-content-center mt-5" style={{flexWrap:'wrap'}}>
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" style={{maxWidth:700}}>
                  {errorMessage && <div className="alert alert-danger" role="alert">
                        {errorMessage}
                  </div>}
                  
                <div className="card py-3 px-2" >
                      
                      <img src={logo} alt="logo" className="logo"/>
                     <div className="division">
                    </div> 
                    {reset ? (<form className="myform" onSubmit={(e)=>handleClick(e)}>
                        <div className="form-group">
                              <input autoFocus id="username" type="text" className="form-control-login form-control" placeholder="Username" value={username} onChange={(e)=>{handleChange();setUsername(e.target.value);}}/> 
                        </div>
                        <div className="form-group"> 
                              <input type="password" className="form-control-login form-control" placeholder="Mot de passe" value={password} onChange={(e)=>{handleChange();setPassword(e.target.value);}}/> 
                        </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="form-group form-check"> <input type="checkbox" className="form-check-input" id="exampleCheck1" value={remember} onChange={()=>setRemember(!remember)}/> <label className="form-check-label" htmlFor="exampleCheck1">Rester connecté</label></div>
                        </div>
                        <div className="col-md-6 col-12 bn" onClick={()=>{setReset(false);setErrorMessage('')}}>Mot se passe oublié</div>
                    </div>
                    <div className="form-group mt-3"> <button type="submit" className="btn btn-block btn-primary btn-lg" ><small>Se connecter</small></button> </div>
                </form>):
                  (<div>
                        <form className="myform resetFrm" onSubmit={()=>setReset(true)}>
                                    <p>Contacter votre administrateur pour récupérer votre mot de passe .</p>
                              <div className="form-group mt-3"> <button type="submit" className="btn btn-block btn-primary btn-lg" ><small><i class="fas fa-long-arrow-alt-left" style={{marginRight:10}}></i> Precedent</small></button> </div>
                        </form>
                  </div>)}
            </div>
        </div>
        </div>
      )
}

export default Login
