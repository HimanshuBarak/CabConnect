import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import { Button} from 'react-bootstrap'
const divstyle ={
  display:'flex',
  flexDirection:'column',
  justifyContent:'center'

}

function Home() {
    return (
       <div style={divstyle}>
          <ParticlesBg  type="cobweb" num="140" bg={true} />
          <div style={{width:"950px",margin:"140px auto auto auto",textAlign:"center",color:"black"}}>
            <h1 style={{fontSize:"clamp(32px,5vw,84px)",fontFamily:"Tahoma, Roboto, Oxygen, Verdana, Cantarell,  sans-serif",fontWeight:"650"}}>WELCOME TO VConnect</h1>
            <h3 style={{fontFamily:"sans-serif"}} className="mt-3">Looking for a people to share your cab fare? Or want to connect with people for future trips?You are at the right place.</h3>
            <Link to="/posts"> <Button style={{borderRadius:"10px",padding:"8px 23px 8px 23px",marginTop:"25px",background:"black"}}>LEARN MORE</Button></Link>
          </div>
       </div>
    )
}

export default Home
