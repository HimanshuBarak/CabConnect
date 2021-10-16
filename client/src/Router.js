import React,{useContext} from 'react'
import {Switch,BrowserRouter,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import AuthContext from './context/AuthContext'
import CreatePost from './components/posts/CreatePost'
import Userposts from './components/posts/Userposts'
import Posts from './components/posts/Posts'
import Home from './components/posts/Home'
import Chat from './components/chat/Chat'


function Router() {

  const {loggedIn} = useContext(AuthContext);
  

  
    return <BrowserRouter>
    <Navbar />
    <Switch>
    <Route exact path="/">
         <Home />
    </Route>   
      {!loggedIn &&(
        <>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        </>
      )}
     {loggedIn ===true &&(
       <>
        <Route path="/posts">
         <Posts />
        </Route>
        <Route path="/create">
         <CreatePost />
        </Route>
        <Route path="/user">
          <Userposts />
        </Route>
        <Route path="/chat">
         <Chat />
        </Route>
       </>
     )}
   
    
    
        
    </Switch>
    
    </BrowserRouter>
}

export default Router

