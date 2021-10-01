import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Admin = () => {
      const history = useHistory();
      const [login,setLogin] = useState('');

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            console.log(cook);
            if(cook.Utilisateur!==undefined && cook.typeUtilisateur === "Administrateur")
            {
                  setLogin(cook.Utilisateur);
                  return;
            }
            if(sessionStorage.getItem('Utilisateur')!==null && sessionStorage.getItem('typeUtilisateur') === "Administrateur")
            {
                  setLogin(sessionStorage.getItem('Utilisateur'));
                  return;
            }
            history.push('/');
      },[])

      return (
            <>
                  {login && <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw',flexDirection:'column'}}>
                              <div className="alert alert-warning" role="alert">Admin page still on work</div>
                              <button className="btn btn-secondary" onClick={()=>{history.push('/');}}>Go back</button>
                        </div>}
            </>
      )
}

export default Admin
