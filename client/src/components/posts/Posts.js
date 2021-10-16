import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DisplayPosts from './DisplayPosts';

import ParticlesBg from 'particles-bg'

function Posts() {
  const [width, setwidth] = useState(window.innerWidth);
    let [t_posts, sett_posts] = useState([]);
    let [posts,setposts]  = useState([])
    let k=0;
    const [Searchdate,setSearchdate] = useState('')
    const [Searchloc ,setSearchloc]  = useState('')
    const [Searchtime ,setSearchtime] = useState('')
    
    async function getposts() {
      // const customersRes = await axios.get("http://localhost:5000/customer/");
      const response = await axios.get(
        "http://localhost:8000/post/"
      );
      setposts(response.data);
    }
   
    useEffect(() => {
      getposts();
    }, []);
     function handlesearch(){
          if(Searchdate)
           posts =t_posts.filter(post=> post.date.substring(0,10) ===Searchdate)
           if(Searchloc)
           posts =t_posts.filter(post=> post.destination ===Searchloc)
           if(Searchtime)
           posts = t_posts.filter(post=> post.time ===Searchtime)
           console.log(posts)       
    } 
     
    return ( 
        <div style={{maxWidth:"1050px",margin:"0px auto 0px auto"}}>
            {width>500 && <ParticlesBg  type="cobweb" num="140" bg={true} /> }  
             <div className="d-flex  mt-4">
                    <p style={{fontSize:"26px",zIndex:"20"}} className="ml-4 mr-5">Search Posts By :</p>
                    <input style={{width:"200px",height:"42px"}} type="date" className="form-control mr-3" placeholder="Enter your departure Date"  onChange={(e)=>setSearchdate(e.target.value)} value={Searchdate}/>
                    <input style={{width:"200px",height:"42px"}} type="text" className="form-control mr-3" placeholder="Enter your location"  onChange={(e)=>setSearchloc(e.target.value)} value={Searchloc}/>
                    <input style={{width:"200px",height:"42px"}} type="text" className="form-control mr-3" placeholder="Enter your time"  onChange={(e)=>setSearchtime(e.target.value)} value={Searchtime}/>
        
                </div>
           
            {posts.map(post=>{
               post.date=post.date.substring(0,10)
              k=0
               if(Searchdate && post.date!==Searchdate)
                k=1
               if(Searchloc && post.destination !==Searchloc)
                k=1
               if(Searchtime && post.time !==Searchtime)
                k=1
               if(k==0)
               return <DisplayPosts post={post} />         
            })}        
        </div>
    )
}

export default Posts
