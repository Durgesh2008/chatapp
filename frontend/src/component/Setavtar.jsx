import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from "../asset/loader.gif"
const host=process.env.REACT_APP_SERVER_URL;
const Container = styled.div`
.imgbox{
  width: 100%;
  height: 100vh;
  display: flex;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  background-color: rgb(58, 37, 37);
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.imgup{
 
 width:50%;
}
.imgsec{
  display: flex;
  text-align: center;
  align-items: flex-start;
 
}
.selected{
  border: 3px solid #0037ff;
  background-color: azure;
  cursor: pointer;
}
img{
  width: 49%;
    padding: 1rem;
    border-radius: 50%;
    object-fit: cover;
}
button{
  width:20%;
}
`

const Setavtar = () => {
  const navigate=useNavigate();
  
  const [avtarArray, setAvtarArray] = useState([]);
  const [selectedavatr,setselectedavtar]=useState(undefined)
  const [isloading,setisloading]=useState(true);
  const fetchAvtar = async (i) => {
    const api = `https://api.multiavatar.com/${i}.png`;
    let pic = await fetch(api);
    return pic.url;
  };

  const fetchData = async () => {
    const promises = [];
    promises.push(fetchAvtar(Math.floor(Math.random() * 1000) + 1));
    promises.push(fetchAvtar(Math.floor(Math.random() * 1000) + 1));
    promises.push(fetchAvtar(Math.floor(Math.random() * 1000) + 1));
    promises.push(fetchAvtar(Math.floor(Math.random() * 1000) + 1));
    promises.push(fetchAvtar(Math.floor(Math.random() * 1000) + 1));
    const results = await Promise.all(promises);
    setAvtarArray(results);
    setisloading(false)
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const storedata=JSON.parse(localStorage.getItem('chat-app-user'))
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
     
      navigate('/login') 
    }
   else{
    if(storedata.user.isavtarImageset){
        
      navigate('/chat') 
    }else{
      navigate('/setavtar') 
    }
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 const setprofilepic=async ()=>{
 
  if(selectedavatr===undefined){
    toast.error("try again")
    alert("Please select an avtar")
  }else{
 
    
    //fetch Image and id by local stroage
    const Id=storedata.user._id;
    const Image=avtarArray[selectedavatr];
    const response=await fetch(`${host}/api/auth/setavtar/${Id}`,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          Image
      })
    })
    const data=await response.json();
   if(data.isset){
    storedata.user.isavtarImageset=true;
    storedata.user.avtarImage=data.image;
   localStorage.setItem('chat-app-user',JSON.stringify(storedata));
   navigate('/chat')
   }else{
    // alert("try again")
    toast.error("try again")
   }
  }
 }

 
  return (
    <>
    {
      isloading?
      (<Container className='d-flex  justify-content-center align-items-center h-100'>
        <img src={loader} className='w-25' alt='Loader' />
      </Container>):
      (
        <Container>

      <div className="imgbox">
        <h1 className='text-white'>Pick The Avtar Image</h1>
        <div className="imgsec">
        {
          avtarArray.map((ele, index) => {
            return (<div key={index} className= "imgup" >
            <img className={`${selectedavatr===index?"selected":""} ` } onClick={()=>setselectedavtar(index)}  src={ele} alt='Avatr'  /></div>)
          })
        }
        </div>
      <button onClick={setprofilepic} type="button" className="btn btn-primary">Set as profile</button>
      </div>
 
    </Container>
      )
    }
    </>
  )
}

export default Setavtar
