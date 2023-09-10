import React, { useState, useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';
import Contact from './Contact';
import Welcome from './Welcome';
import Chatcontainer from './Chatcontainer';
import { io } from "socket.io-client";
const host=process.env.REACT_APP_SERVER_URL;

const Container = styled.div`
width:100vw;
height:100vh;
gap: 1rem;
background-color: rgb(19, 19, 36);
display: flex;
flex-direction: column;
align-content: center;
justify-content: center;
align-items: center;



.container{
  width: 100vw;
  display: grid;
  grid-template-columns: 25% 75%;
  background-color: #00000076;
  height: 100vh;
  @media screen and (min-width:720px ) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width:220px ) and (max-width:720px){
    grid-template-columns: 40% 60%;
  }
}
`
const Chatbox = () => {

  const navigate = useNavigate();
  const socket=useRef(); 
  const [contacts, setcontacts] = useState([]);
  const [curruser, setcurruser] = useState(undefined);
  const [currchat, setcurrchat] = useState(undefined);
  const [isloaded, setisloaded] = useState(false)



  const storedata = JSON.parse(localStorage.getItem('chat-app-user'))
  const Id = storedata.user._id;
  const Token = storedata.token;
 
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login')

    } else {
      setcurruser(storedata)
      setisloaded(true)
    }
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    if(curruser){
      socket.current=io(host)
        socket.current.emit("add-user", curruser.user._id);
    }
  }, [curruser]);

  const alldata = async () => {
    if (curruser) {
      if (curruser.user.isavtarImageset) {
        const response = await fetch(`${host}/api/auth/getuser/${Id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": (Token)
          }

        })
        const data = await response.json();
        setcontacts(data.user)
      } 
    }

  }

  useEffect(() => {
    alldata();
    // eslint-disable-next-line
  }, [curruser]);
  const handlechatchage = (chat) => {
    setcurrchat(chat)
  }


   
  return (

    <Container>
      <div className="container">
        
        <Contact contacts={contacts} curruser={curruser} changechat={handlechatchage} />

        {
          isloaded && currchat === undefined ? (<Welcome curruser={curruser} />) : (
            <Chatcontainer currchat={currchat} curruser={curruser} socket={socket}/>
          )
        }
      </div>
    </Container>
  )
}



export default Chatbox
