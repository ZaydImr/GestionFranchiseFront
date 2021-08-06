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
            idType: 9,
            commands: []
        });

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            if(cook.Utilisateur!==undefined )
            {
                  getUser(cook.Utilisateur);
                  console.log('fasdfsdfas');
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

      return (
            <div className="container emp-profile">
                  <button className='btn btn-back-profile' type='button' onClick={()=>handleGoBack()}><i className="fas fa-long-arrow-alt-left"></i> Go back</button>
                  <button className='btn btn-logout-profile' type='button' onClick={()=>handleLogOut()}>Sign out <i className="fas fa-sign-out-alt"></i></button>

            <form >
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-2">
                        <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-8">
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
                                                <p>{user.nameUtilisateur.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.emailUtilisateur}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.numUtilisateur}</p>
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
