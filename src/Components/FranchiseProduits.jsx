import React from 'react'

const FranchiseProduits = () => {
      return (
            <div>
                        <nav className="navbar navbar-light bg-light">
                              <div className="container-fluid">
                              <img src={logo} alt="logo" />
                              <ul className="navbar-nav d-flex" style={{flexDirection:'row',gap:16}}>
                                    <li className="nav-item active">
                                          <Link to='/' className="nav-link">Produits<span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link to='/' className="nav-link">Agents<span className="sr-only">(current)</span></Link>
                                    </li>
                              </ul>
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
                              </div></div>
                        </div>
      )
}

export default FranchiseProduits
