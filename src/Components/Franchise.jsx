import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './Franchise.css'
import logo from '../Assets/logo.png'
import axios from 'axios';
import Modal from 'react-modal'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Error from './Error';

const Agent = () => {
      const [produit,setProduit] = useState({
            nameProduit: '',
            qteProduit: 0,
            idFranchiseNavigation: null,
            commands: []
        });
        const [tstProduit,setTstProduit] = useState(true);
      const history = useHistory();
      const [login,setLogin] = useState('');
      const [idFranchise,setIdFranchise] = useState(0);
      const [search,setSearch] = useState('');
      const [products,setProducts] = useState([]);
      const [message,setMessage] = useState('');
      const [modalIsOpen, setIsOpen] = useState(false);
      const [modalIsOpen2, setIsOpen2] = useState(false);
      const [isProduits,setIsProduits] = useState(true);
      const [agents,setAgents] = useState([])

      useEffect(()=>{
            if(document.location.pathname==='/franchise/agents')
                  setIsProduits(false);
            let cook = document.cookie
                  .split(';')
                  .map(cookie => cookie.split('='))
                  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
            if(cook.Utilisateur!==undefined && cook.typeUtilisateur === "Franchise")
            {
                  setLogin(cook.Utilisateur);
                  getProducts(cook.Utilisateur);
                  return;
            }
            if(sessionStorage.getItem('Utilisateur')!==null && sessionStorage.getItem('typeUtilisateur') === "Franchise")
            {
                  setLogin(sessionStorage.getItem('Utilisateur'));
                  getProducts(sessionStorage.getItem('Utilisateur'));
                  return;
            }
            history.push('/');
      },[])

      const getProducts=(login)=>{
            document.title = 'DAHAB - Franchise';
            axios.get(process.env.REACT_APP_API+'utilisateur/user/'+login).then((res)=>{
                  setProduit({...produit,idFranchise:res.data.idType});
                  setIdFranchise(res.data.idType);
                  getAgents(res.data.idType);
                  axios.get(process.env.REACT_APP_API+'produits/'+res.data.idType).then((res)=>{
                        setProducts(res.data);
                  });
            });
      }

      const getAgents =(idFranchise)=>{
            axios.get(process.env.REACT_APP_API+'agent/franchise/'+idFranchise).then(res=>{
                  setAgents(res.data);
                  console.log('fwrefer');
            })
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

      const handleDeleteProd=(nameProduit,idProduit)=>{
            axios.delete(process.env.REACT_APP_API+'Produits/'+login+'+'+idProduit).then(()=>{
                  getProducts(login);
                  setMessage('Le produit '+nameProduit+' a ete bien supprimer.');
                   let res = setTimeout(()=>{setMessage('');clearTimeout(res);},3000);
            });
      }

      const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };

      const handleAddProduct=()=>{
            if(produit.nameProduit==='')
            {
                  setTstProduit(false);
                  document.getElementById('nameProduit').focus();
            }
            else{
                  axios.post(process.env.REACT_APP_API+'produits',produit).then(()=>{
                        setIsOpen(false);
                        getProducts(login);
                  }
                  );
            }
      }

      useEffect(()=>{
            setTstProduit(true);
      },[produit.nameProduit])

      return (
            <Router>
                  {login && <div>
                        <nav className="navbar navbar-light bg-light">
                              <div className="container-fluid">
                              <img src={logo} alt="logo" />
                              <ul className="navbar-nav d-flex" style={{flexDirection:'row'}}>
                                    <li className={isProduits ?  'nav-item active' : 'nav-item'}>
                                          <Link to='/franchise/produits' className="nav-link" onClick={()=>setIsProduits(true)}>Produits<span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className={!isProduits ?  'nav-item active' : 'nav-item'} onClick={()=>setIsProduits(false)}>
                                          <Link to='/franchise/agents' className="nav-link">Agents<span className="sr-only">(current)</span></Link>
                                    </li>
                              </ul>
                              <div className="dropdown">
                                    <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {login} &nbsp; <i className="fas fa-user"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                          <label className="dropdown-item" onClick={()=>history.push('/account')} style={{cursor:'pointer'}}>Account &nbsp; <i className="fas fa-cog"></i></label>
                                         <button className=" dropdown-item" onClick={()=>handleLogout()} >Sign Out &nbsp; <i className="fas fa-sign-out-alt"></i></button>
                                    </div>
                              </div>
                              </div>
                              </nav>

                              <div className="agent">
                                   <div className="agent-container">
                              <Switch>
                                          <Route path='/Franchise/produits'>
                                                      {message && <div className="alert alert-success" role="alert">
                                                            {message}
                                                      </div>}
                                                      <div className='add-produit'>
                                                            <button className='btn btn-primary' onClick={()=>setIsOpen(true)} >Ajouter un produit</button>
                                                            <Modal
                                                                  id='AddProductModal'
                                                                  isOpen={modalIsOpen}
                                                                  style={customStyles}
                                                                  onRequestClose={()=>setIsOpen(false)}
                                                            >
                                                                  <h4 style={{margin:'5px 0 20px 0'}}>Produit</h4>
                                                                  <div className="input-group mb-3">
                                                                        <div className="input-group-prepend">
                                                                              <span className="input-group-text" id="inputGroup-sizing-default">Nom produit : </span>
                                                                        </div>
                                                                        <input id='nameProduit' type="text" className={tstProduit ? "form-control" : 'form-control is-invalid'} aria-describedby="inputGroup-sizing-default" value={produit.nameProduit} onChange={e=>setProduit({...produit,nameProduit:e.target.value})}/>
                                                                  </div>
                                                                  <div className="input-group mb-3">
                                                                        <div className="input-group-prepend">
                                                                              <span className="input-group-text" id="inputGroup-sizing-default">Quantite produit : </span>
                                                                        </div>
                                                                        <input type="number" className="form-control" aria-describedby="inputGroup-sizing-default" value={produit.qteProduit} onChange={e=>setProduit({...produit,qteProduit:e.target.value})}/>
                                                                  </div>
                                                                  <div style={{textAlign:'center',marginTop:5}}>
                                                                        <button className='btn btn-primary' onClick={()=>handleAddProduct()}>Ajouter</button>
                                                                  </div>
                                                            </Modal>
                                                      </div>
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
                                                                                          <button type="button" className="btn btn-secondary" onClick={()=>{handleChangeProd(product,product.qteProduit-1);}} ><i className="fas fa-minus"></i></button>
                                                                                          <button type="button" className="btn btn-success" onClick={()=>{handleChangeProd(product,product.qteProduit+1);}} ><i className="fas fa-plus"></i></button>
                                                                                          <button type="button" className="btn btn-danger" onClick={()=>handleDeleteProd(product.nameProduit,product.idProduit)} ><i className="fas fa-trash"></i></button>
                                                                                    </td>
                                                                              </tr>)
                                                                        })}
                                                                  </tbody>
                                                                  {(products.filter(prod=>prod.nameProduit.includes(search)).length===0 && products.length >0)  && <tfoot>
                                                                              <tr>
                                                                                    <td colSpan='3' style={{color:'red'}}>Le produit <strong>{search} </strong> n'existe plus ! </td>
                                                                              </tr>
                                                                        </tfoot>}
                                                                  {products.length===0  && <tfoot>
                                                                              <tr>
                                                                                    <td colSpan='3' style={{color:'red'}}>Il n'existe aucun produit pour cette cafe.</td>
                                                                              </tr>
                                                                        </tfoot>}
                                                                  
                                                            </table>
                                          </Route>
                                          <Route path='/Franchise/agents'>
                                          {message && <div className="alert alert-success" role="alert">
                                                            {message}
                                                      </div>}
                                                      <div className='add-produit'>
                                                            <button className='btn btn-primary' onClick={()=>setIsOpen2(true)} >Ajouter un agent</button>
                                                            <Modal
                                                                  id='AddProductModal'
                                                                  isOpen={modalIsOpen2}
                                                                  style={customStyles}
                                                                  onRequestClose={()=>setIsOpen2(false)}
                                                            >
                                                                  <h4 style={{margin:'5px 0 20px 0'}}>Agent</h4>
                                                                  <div className="input-group mb-3">
                                                                        <div className="input-group-prepend">
                                                                              <span className="input-group-text" id="inputGroup-sizing-default">Nom produit : </span>
                                                                        </div>
                                                                        <input id='nameProduit' type="text" className={tstProduit ? "form-control" : 'form-control is-invalid'} aria-describedby="inputGroup-sizing-default" value={produit.nameProduit} onChange={e=>setProduit({...produit,nameProduit:e.target.value})}/>
                                                                  </div>
                                                                  <div className="input-group mb-3">
                                                                        <div className="input-group-prepend">
                                                                              <span className="input-group-text" id="inputGroup-sizing-default">Quantite produit : </span>
                                                                        </div>
                                                                        <input type="number" className="form-control" aria-describedby="inputGroup-sizing-default" value={produit.qteProduit} onChange={e=>setProduit({...produit,qteProduit:e.target.value})}/>
                                                                  </div>
                                                                  <div style={{textAlign:'center',marginTop:5}}>
                                                                        <button className='btn btn-primary' onClick={()=>handleAddProduct()}>Ajouter</button>
                                                                  </div>
                                                            </Modal>
                                                      </div>
                                                            <form className='agent-search' onSubmit={e=>handleSearch(e)}>
                                                                  <input type="text" placeholder='Entrer quelque chose ...' value={search} onChange={e=>setSearch(e.target.value)}/>
                                                                  <button type="submit" className="btn btn-secondary">Chercher</button>
                                                            </form>
                                                            <table className="table table-striped text-center">
                                                                  <thead>
                                                                        <tr>
                                                                              <th>Username</th>
                                                                              <th>Nom Complet</th>
                                                                              <th>Numero</th>
                                                                              <th>Email</th>
                                                                              <th>Action</th>
                                                                        </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                        {agents.filter(ag=>ag.nameUtilisateur.includes(search)).map((agent)=>{
                                                                              return (<tr key={agent.login}>
                                                                                    <td>{agent.login}</td>
                                                                                    <td>{agent.nameUtilisateur}</td>
                                                                                    <td>{agent.numUtilisateur}</td>
                                                                                    <td>{agent.emailUtilisateur}</td>
                                                                                    <td className='d-flex gap-1 justify-content-center'>
                                                                                          <button type="button" className="btn btn-primary" onClick={()=>{}} ><i className="fas fa-user-edit"></i></button>
                                                                                          <button type="button" className="btn btn-secondary" onClick={()=>{}} ><i className="fas fa-user-lock"></i></button>
                                                                                          <button type="button" className="btn btn-danger" onClick={()=>{}} ><i className="fas fa-trash"></i></button>
                                                                                    </td>
                                                                              </tr>)
                                                                        })}
                                                                  </tbody>
                                                                  {(agents.filter(ag=>ag.nameUtilisateur.includes(search)).length===0 && products.length >0)  && <tfoot>
                                                                              <tr>
                                                                                    <td colSpan='3' style={{color:'red'}}>L'agent <strong>{search} </strong> n'existe plus ! </td>
                                                                              </tr>
                                                                        </tfoot>}
                                                                  {products.length===0  && <tfoot>
                                                                              <tr>
                                                                                    <td colSpan='3' style={{color:'red'}}>Il n'existe aucun agent pour cette cafe.</td>
                                                                              </tr>
                                                                        </tfoot>}
                                                                  
                                                            </table>
                                          </Route>
                                          <Route path='*' >
                                                <Link to='/franchise/produits'>Go to produits</Link>
                                          </Route>
                                    </Switch>
                                    </div>
                              </div>
                        </div>
                        }
            </Router>
      )
}

export default Agent
