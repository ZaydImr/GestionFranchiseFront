import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Account.css'

const Account = () => {
      const history = useHistory();
      const [user,setUser] = useState({
            login: '',
            password: '',
            nameUtilisateur:'',
            numUtilisateur: '',
            emailUtilisateur: '',
            typeUtilisateur: '',
            idType: 0,
            commands: []
        });
        const [newUser,setNewUser] = useState({});
        const [tst,setTst] = useState(true);

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            if(cook.Utilisateur!==undefined )
            {
                  getUser(cook.Utilisateur);
                  return;
            }
            
            if(sessionStorage.getItem('Utilisateur')!=='undefined'){
                  getUser(sessionStorage.getItem('Utilisateur'));
                  return;
            }

            history.push('/');
      },[])

      const getUser=(login)=> {
            axios.get(process.env.REACT_APP_API+'utilisateur/user/'+login).then((res)=>{
                  setUser(res.data);
                  setNewUser(res.data);
            })
      }

      const handleGoBack = ()=>{
            if(user.typeUtilisateur==='Agent')
                  history.push('/agent');
            if(user.typeUtilisateur==='Franchise')
                  history.push('/franchise');
            if(user.typeUtilisateur==='Administrateur')
                  history.push('/administrateur');
      }

      const handleLogOut=()=>{
            document.cookie = 'Utilisateur=null; expires='+new Date(2000,1,1).toUTCString();
           document.cookie = 'typeUtilisateur=null; expires='+new Date(2000,1,1).toUTCString();
           sessionStorage.removeItem('Utilisateur')
           sessionStorage.removeItem('typeUtilisateur') 
           history.push('/');
     }

     const handleEditClick=()=>{
         setTst(false);
         let name = document.querySelector("#nameUtilisateur");
         name.focus();
     }

     const handleValidate=()=>{
        axios.put(process.env.REACT_APP_API+'Utilisateur/',user).then(()=>{setTst(true);getUser(user.login); });
     }

     const handleCancel=()=>{
        setUser(newUser);
        setTst(true);
    }

      return (
            <div className="container emp-profile">
                  <button className='btn btn-back-profile' type='button' onClick={()=>handleGoBack()}><i className="fas fa-long-arrow-alt-left"></i> Go back</button>
                  <button className='btn btn-logout-profile' type='button' onClick={()=>handleLogOut()}>Sign out <i className="fas fa-sign-out-alt"></i></button>

            <form >
                <div className="row">
                    
                    <div className="col-md-9">
                        <div className="profile-head">
                                    <h5 style={{fontWeight:600}}>
                                        {user.nameUtilisateur}
                                    </h5>
                                    <h6 style={{fontWeight:600}}>
                                        {user.typeUtilisateur}
                                    </h6>
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {!tst ? (<>
                            <input type="button" className="btn btn-success"value="Validate" disabled={tst} onClick={()=>handleValidate()} style={{margin: '1.5px 1.5px 1.5px 0'}}/>
                            <input type="button" className="btn btn-danger"value="Cancel" disabled={tst} onClick={()=>handleCancel()}  style={{margin: '1.5px 0 0 1.5px '}}/>
                        </>):(
                        <input type="button" className="profile-edit-btn"value="Edit Profile" disabled={!tst} onClick={()=>handleEditClick()}/>)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Username</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.login}</p>
                                            </div>
                                        </div>
                                        <div className="row">   
                                            <div className="col-md-6">
                                                <label>Fullname</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input id='nameUtilisateur' autoFocus value={user.nameUtilisateur} onChange={(e)=>setUser({...user,nameUtilisateur : e.target.value.toUpperCase()})} disabled={tst}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input type='email' value={user.emailUtilisateur} onChange={e=>setUser({...user,emailUtilisateur : e.target.value})}  disabled={tst}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input type='email' value={user.numUtilisateur} onChange={e=>setUser({...user,numUtilisateur : e.target.value})} disabled={tst}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.typeUtilisateur}</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
      )
}

export default Account
