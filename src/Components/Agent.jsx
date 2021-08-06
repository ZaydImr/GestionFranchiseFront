import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Agent.css'
import logo from '../Assets/logo.png'
import axios from 'axios';

const Agent = () => {
      const [qte,setQte] = useState(0);
      const history = useHistory();
      const [login,setLogin] = useState('');
      const [user,setUser] = useState({});
      const [products,setProducts] = useState([{idProduit:1,nameProduit:'hhha',qteProduit:10}]);

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            if(cook.Utilisateur!==undefined && cook.typeUtilisateur === "Agent")
            {
                  setLogin(cook.Utilisateur);
                  getProducts(cook.Utilisateur);
                  return;
            }
            if(sessionStorage.getItem('Utilisateur')!==null && sessionStorage.getItem('typeUtilisateur') === "Agent")
            {
                  setLogin(sessionStorage.getItem('Utilisateur'));
                  getProducts(sessionStorage.getItem('Utilisateur'));
                  return;
            }
            history.push('/');
      },[])

      const getProducts=(login)=>{
            axios.get(process.env.REACT_APP_API+'Agent/'+login).then((res)=>{
                  setUser(res.data);
                  axios.get(process.env.REACT_APP_API+'produits/'+res.data.idFranchise).then((res)=>{
                        setProducts(res.data);
                  });
            });
      }

      return (
            <>
                  {login && <div>
                        <nav className="navbar navbar-light bg-light">
                              <div className="container-fluid">
                              <img src={logo} alt="logo" />
                              <p className="mb-0">{login}</p>
                              </div>
                              </nav>
                              <div className="agent">
                              <div className="agent-container">
                                    <table className="table table-striped">
                                          <thead>
                                                <tr>
                                                      <th>Produit</th>
                                                      <th>Quantite</th>
                                                      <th>Action</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {products.map((product)=>{
                                                      if(qte==0)
                                                            setQte(product.qteProduit);
                                                      return <tr key={product.idProduit}>
                                                            <td>{product.nameProduit}</td>
                                                            <td><input type="number" style={{backgroundColor:'transparent',border:'none',maxWidth:65}} value={qte} onChange={(e)=>setQte(e.target.value)} /> </td>
                                                            <td className='d-flex gap-1'>
                                                                  <button type="button" className="btn btn-danger"><i className="fas fa-minus"></i></button>
                                                                  <button type="button" className="btn btn-success"><i className="fas fa-plus"></i></button>
                                                            </td>
                                                      </tr>
                                                })}
                                          </tbody>
                                    </table>
                              </div></div>
                        </div>}
            </>
      )
}

export default Agent
