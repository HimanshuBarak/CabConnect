import React from 'react'
import { Card,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function DisplayPosts({post}) {
   
  
   
    return (
      <div style={{maxWidth:"1000px",display:"flex",justifyContent:"center",margin:"0px auto 0px auto"}}>
          <Container  className="m-3 container shadow">
            <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
            <p class="font-weight-bold h4">Name - <span className=" font-weight-light h5">{post.roomName}</span></p>
            </Card.Title>
           
           

            <Card.Text>
              <div class="container">
                <div class="row">
               
                <div style={{minWidth:"375px"}}  class="col d-flex"><p class="font-weight-bold h5 ">Destination - </p><span className=" font-weight-light h5">{post.destination}</span></div> 
                <div style={{minWidth:"375px"}} class="col d-flex"><p class="font-weight-bold h5">Departure Time - </p> <span className=" font-weight-light h5">{post.time}</span></div>
                <div style={{minWidth:"375px"}} class="col d-flex"><p class="font-weight-bold h5 ">Date - </p><span className=" font-weight-light h5">{post.date}</span></div>
               
               
                <div style={{minWidth:"375px"}} class="col d-flex"><p class="font-weight-bold h5 ">People Required - </p><span className=" font-weight-light h5">{post.people}</span></div> 
                <div style={{minWidth:"375px"}} class="col d-flex"><p class="font-weight-bold h5">Contact No.- </p><span className=" font-weight-light h5">{post.contact}</span></div>
                <Link
                      to={{
                        pathname: "/chat",
                        state: { chatroom:post.roomName }
                      }}
                    >
                <div style={{minWidth:"375px"}} class="col d-flex"><button className="chat-btn">Join Chat</button></div>
                </Link>
              
              </div>
             </div>
            </Card.Text>
            
          </div>
         
        </div>
       
      </Card.Body>
    </Card>
        </Container>
      </div>
       
       
    )
}

export default DisplayPosts
