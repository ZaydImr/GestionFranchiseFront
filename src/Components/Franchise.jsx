import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Franchise = () => {
      const history = useHistory();
      const [login,setLogin] = useState('');

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            console.log(cook);
            if(cook.Utilisateur!==undefined && cook.typeUtilisateur === "Franchise")
            {
                  setLogin(cook.Utilisateur);
                  console.log('cookie nice');
                  return;
            }
            if(sessionStorage.getItem('Utilisateur')!==null && sessionStorage.getItem('typeUtilisateur') === "Franchise")
            {
                  setLogin(sessionStorage.getItem('Utilisateur'));
                  console.log('session nice');
                  return;
            }
            history.push('/');
      },[])

      return (
            <>
                  {login && <div>
                              Franchise
                        </div>}
            </>
      )
}

export default Franchise
