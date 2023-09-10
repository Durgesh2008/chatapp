import React,{useState} from 'react'
import styled from 'styled-components';
import Picker from '@emoji-mart/react'

const Container=styled.div`
    display:grid;
    grid-template-columns: 5% 95%;
    align-items:center;
    
    padding:0.2rem;
    padding-bottom:0.3rem;
    height:13.99%;
    gap:1rem;
    @media screen and (min-width:720px ) and (max-width:1080px){
      padding:0.1rem;
    padding-bottom:0.2rem;
    margin-bottom:1rem;
    height:13%;
    gap:0.7rem;
            }
    .btn-container{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1rem;
        color:white;
        .emoji{
            position:relative;
            font-size:2rem;
            margin-left:0.5rem;
            color:#ffff00c8;
            cursor:pointer;
            @media only screen and (max-width: 600px) {
                   font-size: 19px;
                   margin-left:1.2rem;
}
            @media screen and (min-width:720px ) and (max-width:1080px){
              font-size: 1.2rem;
              margin-left:1rem;
            }
            i{
    
              em-emoji-picker{
                position: absolute;
                  bottom: 100%;
                  width: 33vw;
  
              }
            }
        }
        
    }
    .input-container{
        width:100%;
        border-radius:2rem;
        display:flex;
        width:100%;
        position:relative;
        align-items:center;
        gap:2rem;
   
        input{
            width:90%;
            height:60%;
            color:black;
            border:none;
            border-radius: 2rem;
            font-size:2rem;
            padding-left:1rem; 
            @media screen and (min-width:720px ) and (max-width:1080px){
              height:2rem;
              font-size: 1rem;
             
            }
            @media only screen and (max-width: 600px) {
              height: 30px;
              font-size: 10px;
}
            &::selection{
                background-color:#9186f3
            }
            &:focus{
                outline:none;
            }
        }
        .button{
            position:absolute;
            right:10%;
            padding:0.3rem 2rem;
            border-radius:2rem;
            display:flex;
          justify-content:center;
           align-items:center;
           border:none;
           @media only screen and (max-width: 600px) {
            right:1%;
}
  
           i{
            font-size:2rem;
            color:blue;
            @media screen and (min-width:720px ) and (max-width:1080px){
              font-size: 1.2rem;
              background:none;
             
            }
            @media only screen and (max-width: 600px) {
              font-size: 1rem;
              background:none;
              
}
           }
        }
    }
`

const ChatInput = ({handlesendmsg}) => {
    const [showEmojiPicker,setEmojiPicker]=useState(false);
    const [msg,setmsg]=useState("");

    const handleEmojiPickerHideShow=()=>{
        setEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick=(event)=>{
        let message=msg;
        message+=event.native;
        setmsg(message);
    }
   const sendchat=(e)=>{
    e.preventDefault();
    handlesendmsg(msg);
    setmsg("")
   }
  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
        <i onClick={handleEmojiPickerHideShow} className="fa-regular fa-face-smile">
         {showEmojiPicker&& <Picker onEmojiSelect={handleEmojiClick}   />}
        </i>
        </div>
      </div>
      <form method='POST' className="input-container" onSubmit={(e)=>sendchat(e)}>
        <input type="text" placeholder='Type your message here' value={msg} onChange={(e)=>setmsg(e.target.value)} />
       
        <i onClick={(e)=>sendchat(e)} className="fa-solid fa-paper-plane button"></i>
       
      </form>
    </Container>
  )
}

export default ChatInput
