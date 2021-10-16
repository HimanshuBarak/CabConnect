import React ,{useState}  from 'react'
import { useHistory} from "react-router-dom";
import axios from 'axios'
import ParticlesBg from 'particles-bg'


function CreatePost() {

    const [width, setwidth] = useState(window.innerWidth);
    const [post,setpost] =useState({
        roomName:"",
        destination:"",
        time:"",
        date:"",
        people:0,
        contact:""
    });
    const {roomName,destination,time,date,people,contact} =post;
    console.log(post)
    const history = useHistory();
   
    async function create_post(e){
        e.preventDefault(); 
        try{
          const new_post={
            roomName,destination,time,date,people,contact
          }
          
          await axios.post("http://localhost:8000/post/create",new_post);
         
          history.push('/posts');
        }catch(err){
            if(err.response)
             alert(err.response.data.errorMessage)
             console.error(err)
        }
    }
    const handleresize=()=>{
        setwidth(window.innerWidth);
       
    }
    window.addEventListener('resize',handleresize);
    return (
        <div >
          <div style={{"maxWidth":"600px" ,paddingLeft:"25px",paddingRight:"25px"}} className={`container ${width>500?"shadow":""}`}>
           {width>500 && <ParticlesBg  type="cobweb" num="140" bg={true} /> }  
            <form onSubmit={create_post}>
                <h3>Create a Post</h3>
                
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Your chatroom name"  onChange={e=>setpost({...post,roomName:e.target.value})} value={roomName}/>
                </div>
                <div className="form-group">
                    <label>Destination </label>
                    <input type="text" className="form-control" placeholder="Enter your Destination"  onChange={e=>setpost({...post,destination:e.target.value})} value={destination}/>
                </div>
                <div className="form-group">
                    <label>Departure Time </label>
                    <input type="text" className="form-control" placeholder="Enter Departure Time in 24 hr format"  onChange={e=>setpost({...post,time:e.target.value})} value={time}/>
                </div>
                <div className="form-group">
                    <label>Departure Date  </label>
                    <input type="date" className="form-control" placeholder="Enter your departure Date"  onChange={e=>setpost({...post,date:e.target.value})} value={date}/>
                </div>
                <div className="form-group">
                    <label>People </label>
                    <input type="number" className="form-control" placeholder="Enter no. of people your looking to share cab with"  onChange={e=>setpost({...post,people:e.target.value})} value={people}/>
                </div>
                <div className="form-group">
                    <label>Contact Number </label>
                    <input type="text" className="form-control" placeholder="Enter your contact number"  onChange={e=>setpost({...post,contact:e.target.value})} value={contact}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-3" >Add Post</button>
               
            </form>
        </div>
        </div>
       
    )
}

export default CreatePost


