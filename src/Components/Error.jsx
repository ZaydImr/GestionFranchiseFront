import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Error.css'

const Error = () => {
      const history = useHistory();

      useEffect(()=>{
           setTimeout(()=>{
                  history.push('/');
            },3000);
      },[])

      return (
            <div id="notfound">
                  <div class="notfound">
                        <div class="notfound-404">
                              <h1>Oops!</h1>
                              <h2>404 - The Page can't be found</h2>
                        </div>
                        <Link to='/'>Go TO Homepage</Link>
                  </div>
            </div>
      )
}

export default Error
