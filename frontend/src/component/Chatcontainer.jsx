import React,{useState,useEffect, useRef} from 'react'
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
const host=process.env.REACT_APP_SERVER_URL;
const Container = styled.div`
display:grid;
width: 100%;
grid-template-rows:10% 78% 12%;
gap:0.1rem;
overflow:hidden;

.chat-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    gap:2rem;
    margin-top: 4%;
    background-color: rgb(12 13 14);
    border-radius:2%;
    @media screen and (min-width:720px ) and (max-width:1080px){
      margin-top: 10%;
            }
    
  @media only screen and (max-width: 600px) {
        margin-top:1%;
        gap:1rem;
    }
    .user-details{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    gap:1rem;
    @media only screen and (max-width: 600px) {
      gap:5px;
    }
    .avtar{
        img{
            height:3.6rem;
            border-radius:50%;
            @media screen and (min-width:720px ) and (max-width:1080px){
              height:2.4rem;
            }
            @media only screen and (max-width: 600px) {
         height: 1.4rem;
    }
        }
    } 
    .username{
        h3{
            color:#dfdddd;
            text-transform:capitalize;
            @media screen and (min-width:720px ) and (max-width:1080px){
              font-size: 0.9rem;
            }
            @media only screen and (max-width: 600px) {
             margin-top: 14px;
              font-size: 14px;
    }
        }
    }
    }
}
.chat-message{
  padding:1rem 2rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  overflow:auto;
  @media screen and (min-width:720px ) and (max-width:1080px){
              font-size: 0.9rem;
              padding:0.8rem 1.7rem;
            }
  &::-webkit-scrollbar {
   width:0.4rem;
   &-thumb{
     background-color:#e4dada39;
    width:0.1rem;
    border-radius:1rem;
   }
}

  .message{
    display:flex;
    align-items:center;
    .content{
      max-width: 40%;
      display: flex;
  align-items: center;
    overflow-wrap: break-word;
    padding: 0.5rem;
    color:#e6dada;
    border-radius: 1rem;
    @media screen and (min-width:720px ) and (max-width:1080px){
              padding: 0.4rem;
            }
    }
  }
  .sended{
    justify-content:flex-end;
    .content{
      background-color:#4f04ff21;
    }
  }
  .received{
    justify-content:flex-start;
    .content{
      background-color:#9900ff20;
    }
   
  }
}
`
const Chatcontainer = ({currchat,curruser,socket}) => {
  const scrollRef=useRef();
  const [Messages,setMessages]=useState([]);
  const [arrivelmsg, setarrivelmsg] = useState(null);


    useEffect(() => {
      const allMsgOfUser = async () => {
        if (curruser && curruser.user) {
          // eslint-disable-next-line
          const response = await fetch(`${host}/api/msg/allmsg`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: curruser.user._id,
              to: currchat._id,
            })
          });
        
          const data = await response.json();
        
          setMessages(data);
          
        } else {
          console.log("curruser is undefined");
        }
      };
  
      if (curruser && curruser.user && currchat) {
        allMsgOfUser();
      }
      // eslint-disable-next-line
    }, [currchat]);
 

    const handlesendmsg=async(msg)=>{
      // eslint-disable-next-line
      const response=await fetch(`${host}/api/msg/addmsg`,{
       method:"POST",
       headers:{
           "Content-Type":"application/json"
       },
       body:JSON.stringify({
          from:curruser.user._id,
          to:currchat._id,
          message:msg
       })
     })
     
    socket.current.emit("send-msg",{
      to:currchat._id,
      from:curruser.user._id,
      message:msg

    });
    const msgs=[...Messages];
    msgs.push({fromSelf:true,message:msg})
    setMessages(msgs);

   
  };


  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
       
        setarrivelmsg({ fromSelf: false, message: msg });
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    arrivelmsg&& setMessages((prev)=>[...prev,arrivelmsg]);
  }, [arrivelmsg]);

    useEffect(() => {
     scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    }, [Messages]);
    // console.log(Messages)
    // console.log(curruser.user._id)
    // console.log(currchat._id)
    // const indexdega=(e)=>{
    // if(e.target.className==="message received" || e.target.className==="message sended"){
    //   e.target.className="d-none "
    // }
    // }
    return (
      <>
      {
          currchat&&(<Container>
            <div className="chat-header">
          <div className="user-details">
              <div className="avtar">
              <img src={currchat.avtarImage} alt="" />
              </div>
              <div className="username">
              <h3>{currchat.name}</h3>
              </div>
          </div>
              <Logout/>
            </div>
            <div  className="chat-message">
              {
                Messages.map((message)=>{
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf?"sended":"received"}`}>
                              <div className="content">
                                <p>{message.message}</p>
                              </div>
                            </div>
                        </div>
                    )
                })
              }  
            </div>
          
            <ChatInput handlesendmsg={handlesendmsg}/>
          </Container>)
        }
        </>
        )
}

export default Chatcontainer
