import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Agent.css'
import logo from '../Assets/logo.png'
import axios from 'axios';

const Agent = () => {
      const [qte,setQte] = useState(0);
      const history = useHistory();
      const [login,setLogin] = useState('');
      const [user,setUser] = useState({});
      const [typeStorage,setTypeStorage] = useState('');
      const [search,setSearch] = useState('')
      const [data,setData] = useState([]);
      const [products,setProducts] = useState([]);
      const [message,setMessage] = useState('');

      useEffect(()=>{
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            if(cook.Utilisateur!==undefined && cook.typeUtilisateur === "Agent")
            {
                  setLogin(cook.Utilisateur);
                  getProducts(cook.Utilisateur);
                  setTypeStorage('cookie');
                  return;
            }
            if(sessionStorage.getItem('Utilisateur')!==null && sessionStorage.getItem('typeUtilisateur') === "Agent")
            {
                  setLogin(sessionStorage.getItem('Utilisateur'));
                  getProducts(sessionStorage.getItem('Utilisateur'));
                  setTypeStorage('session');
                  return;
            }
            history.push('/');
      },[])

      const getProducts=(login)=>{
            axios.get(process.env.REACT_APP_API+'Agent/'+login).then((res)=>{
                  setUser(res.data);
                  axios.get(process.env.REACT_APP_API+'produits/'+res.data.idFranchise).then((res)=>{
                        setProducts(res.data);
                        setData(res.data);
                  });
            });
      }

      const handleLogout=()=>{
             document.cookie = 'Utilisateur=null; expires='+new Date(2000,1,1).toUTCString();
            document.cookie = 'typeUtilisateur=null; expires='+new Date(2000,1,1).toUTCString();
            sessionStorage.removeItem('Utilisateur')
            sessionStorage.removeItem('typeUtilisateur') 
            history.push('/');
      }

      const handleSearch = (e)=>{
                  e.preventDefault();
      }

      const handleChangeProd =(produit,newValue)=>{
            produit.qteProduit = newValue;
            axios.put(process.env.REACT_APP_API+'Produits/'+login,produit).then(()=>{
                        getProducts(login);
                        setMessage('Le produit '+produit.nameProduit+' a ete bien modifier avec quantite : '+produit.qteProduit+'.');
                        let res = setTimeout(()=>{setMessage('');clearTimeout(res);},3000);
            })
      }

      return (
            <>
                  {login && <div>
                        <nav className="navbar navbar-light bg-light">
                              <div className="container-fluid">
                              <img src={logo} alt="logo" />
                              <div className="dropdown">
                                    <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {login} &nbsp; <i className="fas fa-user"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                          <Link className="dropdown-item" to="/account">Account &nbsp; <i className="fas fa-cog"></i></Link>
                                         <button className=" dropdown-item" onClick={()=>handleLogout()} >Sign Out &nbsp; <i className="fas fa-sign-out-alt"></i></button>
                                    </div>
                              </div>
                              </div>
                              </nav>
                              <div className="agent">
                              <div className="agent-container">
                              {message && <div className="alert alert-success" role="alert">
                                    {message}
                              </div>}
                                    <form className='agent-search' onSubmit={e=>handleSearch(e)}>
                                          <input type="text" placeholder='Entrer quelque chose ...' value={search} onChange={e=>setSearch(e.target.value)}/>
                                          <button type="submit" className="btn btn-secondary">Chercher</button>
                                    </form>
                                    <table className="table table-striped text-center">
                                          <thead>
                                                <tr>
                                                      <th>Produit</th>
                                                      <th>Quantite</th>
                                                      <th>Action</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {products.filter(prod=>prod.nameProduit.includes(search)).map((product)=>{
                                                      return (<tr key={product.idProduit}>
                                                            <td>{product.nameProduit}</td>
                                                            <td><input type="number" style={{backgroundColor:'transparent',border:'none',maxWidth:65}} defaultValue={product.qteProduit} onBlur={e=>handleChangeProd(product,e.target.value)}/> </td>
                                                            <td className='d-flex gap-1 justify-content-center'>
                                                                  <button type="button" className="btn btn-danger" onClick={()=>{handleChangeProd(product,product.qteProduit-1);}} ><i className="fas fa-minus"></i></button>
                                                                  <button type="button" className="btn btn-success" onClick={()=>{handleChangeProd(product,product.qteProduit+1);}} ><i className="fas fa-plus"></i></button>
                                                            </td>
                                                      </tr>)
                                                })}
                                          </tbody>
                                          {(products.filter(prod=>prod.nameProduit.includes(search)).length==0 && products.length >0)  && <tfoot>
                                                      <tr>
                                                            <td colSpan='3' style={{color:'red'}}>Le produit <strong>{search} </strong> n'existe plus ! </td>
                                                      </tr>
                                                </tfoot>}
                                          {products.length==0  && <tfoot>
                                                      <tr>
                                                            <td colSpan='3' style={{color:'red'}}>Il n'existe aucun produit pour cette cafe.</td>
                                                      </tr>
                                                </tfoot>}
                                          
                                    </table>
                              </div></div>
                        </div>}
            </>
      )
}

export default Agent
