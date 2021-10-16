import React,{useState,useEffect} from 'react'
import { Container} from 'react-bootstrap'
import axios from 'axios'
import user from '../user.png'
import ParticlesBg from 'particles-bg'

function Userposts() {
      const [userpost, setUserpost] = useState([])
      const [email,setemail] =useState("") 
      useEffect(() => {
          async function getuserposts(){
             const response = await axios.get( "http://localhost:8000/post/user") 
             setUserpost(response.data);
             //console.log(userpost[0].email)
            
          }
          getuserposts();
      }, [])
      //setemail(userpost[0].email)
      console.log(userpost)
      function deletepost(id){
        axios.delete('http://localhost:8000/post/del/'+id)
          .then(response => { console.log(response.data)});
        //remove posts if  its id matches to the post to be deleted
        setUserpost(userpost.filter(el => el._id !== id));
        console.log(userpost)
      }
    return (
        <div className="pt-5 ">
          <ParticlesBg  type="cobweb" num="140" bg={true} />
          <Container >
        <div className="text-center">
           <img width="200px" height="200px" src={user} alt=""/>
          <p style={{fontSize:"22px"}} className="mt-2 "> </p>  
        </div>    
        <h3>Posts shared by you</h3>
        <div className="table-responsive">
        <table style={{maxwidth:"600px;"}} className="table mt-3 .bg-light shadow">
          <thead className="thead-dark">
            <tr>
            
              <th>Topic</th>
              
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           {userpost.map(post=>{
               return <tr>
              
               <td>{post.destination}</td>
              
               <td>{post.date.substring(0,10)}</td>
                <td> <a href="#"  onClick={()=>deletepost(post._id)}>Delete</a> </td>
               </tr>
                
           })}
          </tbody>
        </table>
     
        </div>
        </Container>  
        </div>
        
    )
}

export default Userposts
