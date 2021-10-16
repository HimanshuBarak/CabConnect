import React,{ useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

function Navbar() {

    const {loggedIn,getLoggedIn,user} = useContext(AuthContext);
    

    const history = useHistory(); //gets the array of previously used routes
    async function logOut() {
      await axios.get("http://localhost:8000/auth/logout");
     
      await getLoggedIn();
      history.push("/");
    }
    return ( 
      <nav class="navbar navbar-expand-lg navbar-light ">
    <div class="d-flex flex-grow-1">
        <span class="w-100 d-lg-none d-block"></span>
        <a class="navbar-brand" href="/">
          <h4> VConnect </h4>
        </a>
        <div class="w-100 text-right">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar7">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
    <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
        <ul class="navbar-nav ml-auto flex-nowrap ">
        { !loggedIn && (<>
          <li class="nav-item "><Link class="nav-link" to="/register"><h5>Register</h5> </Link></li>
          <li class="nav-item"> <Link class="nav-link" to="/login"><h5>Login</h5></Link></li>
         </>)}
       {loggedIn===true && (<>  
        <li class="nav-item"> <Link class="nav-link" to="/posts"><h5>Posts</h5></Link></li>
        <li class="nav-item"> <Link class="nav-link" to="/create"><h5>Create</h5></Link></li>
        <li class="nav-item"> <Link class="nav-link" to="/user"><h5>My Posts</h5></Link></li>
       
        <li class="nav-item"> <Link class="nav-link" to="/logout" onClick={logOut}><h5>Logout</h5></Link></li>  
       </>)}
        </ul>
    </div>
</nav>

    )
}



export default Navbar
