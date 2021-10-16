import React,{useState,useContext}  from 'react'
import { Link,useHistory} from "react-router-dom";
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import ParticlesBg from 'particles-bg'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [width, setwidth] = useState(window.innerWidth);
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();
    
    async function login(e){
        e.preventDefault();
        
        try{
          const user={
            email,
            password,
          }
          const resp = await axios.post("http://localhost:8000/auth/login",user);
        
          await getLoggedIn();
          history.push("/");
        }catch(err){
             if(err.response)
             alert(err.response.data.errorMessage)
        }
        const handleresize=()=>{
            setwidth(window.innerWidth);
           
        }
        window.addEventListener('resize',handleresize);
    }

    return (
        <div style={{"maxWidth":"600px",marginTop:"70px"}} className={`container ${width>500?"shadow":""}`}>
            {width >500 && <ParticlesBg type="cobweb" num="150" bg={true} />} 
            <form onSubmit={login}>
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>setPassword(e.target.value)} value={password}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    New User?  <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    )
}

export default Login


