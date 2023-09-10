import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from "../asset/logo.png"
const Container = styled.div`
display:grid;
grid-template-rows: 15% 70% 15%;
overflow:hidden;
background-color:#080420;

.brand{
    display:flex;
    justify-content: center;
    align-items: center;
    gap:2rem;
   margin-top:9%;
   @media only screen and (max-width: 600px) {
    margin-top:5%;
    justify-content: flex-start;
    align-items: center;
    gap:1rem;
    font-size: 14px;
    }
    img{
        height: 5rem;
        width: 3rem;
        @media screen and (min-width:720px ) and (max-width:1080px){
             height: 4rem;
             width: 2rem;
            }
            @media only screen and (max-width: 600px) {
                height: 10px;
               width: 10px;
    }
  
    }
    h3{
        color:white;
        text-transform:uppercase;
        @media screen and (min-width:720px ) and (max-width:1080px){
             font-size:1rem;
            }
            @media only screen and (max-width: 600px) {
           font-size: 14px;
    }
    }
}
.contacts{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    overflow:auto;
    flex-direction:column;
    gap:0.8rem;
    @media screen and (min-width:720px ) and (max-width:1080px){
        gap:0.5rem;
            }
   @media only screen and (max-width: 600px) {
    gap:0.3rem;
    }
    &::-webkit-scrollbar {
   width:0.4rem;
   &-thumb{
     background-color:#e4dada39;
    width:0.1rem;
    border-radius:1rem;
   }
}

    .contact{
        display: flex;
    background-color: rgb(139 99 132 / 22%);
    min-height: 5rem;
    border-radius: 0.2rem;
    padding:0.4rem;
    width: 90%;
    gap:1rem;
    place-content: center space-around;
    -webkit-box-align: baseline;
    align-items: center;
    transition:0.5s ease-in-out;
    justify-content: flex-start;
    @media screen and (min-width:720px ) and (max-width:1080px){
             height: 1.5rem;
             
            }
 @media only screen and (max-width: 600px) {
    height: 1rem;
    min-height: 3.5rem;
    width: 95%;
    }
          .avtar{
            height:3rem;
            @media only screen and (max-width: 600px) {
                height:2rem;
    }
            img{
                width: 100%;
                border-radius: 50%;
                height: 100%;
            }
            @media screen and (min-width:720px ) and (max-width:1080px){
             height: 3rem;
             width: 2rem;
            }
        }
        .username{
            color:white;
            text-transform: capitalize;
            h6{
   @media screen and (min-width:720px ) and (max-width:1080px){
             font-size:0.7rem;
            }
     @media only screen and (max-width: 600px) {
        font-size:0.5rem;
    }
            }
        }
    }
    .selected{
        background-color: #f097b2;
        cursor:pointer;
    }
    
    
}
.current-user{
    display: flex;
    min-height: 5rem;
    gap: 1rem;
    width: 100%;
    place-content: center space-around;
    -webkit-box-align: center;
    align-items: center;
    justify-content: flex-start;
    @media only screen and (max-width: 600px) {
        min-height: 4rem;
    gap: 0.7rem;
    }
    .avtar{
        margin-bottom:5%;
        @media only screen and (max-width: 600px) {
        margin-bottom: 3%;
    }
        img{
                height: 4rem;
                width:4rem;
                @media screen and (min-width:720px ) and (max-width:1080px){
                    height: 2rem;
                    width:2.5rem;
      
            }
            @media only screen and (max-width: 600px) {
         height: 20px;
         width: 18px;
    }
            }
        }
        .username{
            color:#0fd3f39c;
            margin: 0.3rem;
            text-transform: capitalize;
            @media only screen and (max-width: 600px) {
                margin: 0.2rem;
                
    }
        }
        @media only screen and (max-width: 600px) {
     h3{
         font-size: 12px;
            
         }
    }
        @media screen and (min-width:720px ) and (max-width:1080px){
         gap:0.5rem;
         h3{
            font-size:1rem;
            
         }
}
}

`

const Contact = ({ contacts, curruser, changechat }) => {
    
    const [curruserName, setcurruserName] = useState(undefined)
    const [curruserImage, setcurruserImage] = useState(undefined)
    const [currSeleted, setcurrSeleted] = useState(undefined)

    useEffect(() => {
        if (curruser) {
            setcurruserName(curruser.user.name)
            setcurruserImage(curruser.user.avtarImage)
        }
    }, [curruser])

    const chagecurrentchat = (index, contact) => {
        setcurrSeleted(index);
        changechat(contact)
    }

    return (
        <>

            {
                curruserImage && curruserName && (
                    <Container>
                        <div className="brand">
                            <img src={logo} alt="logo" />
                            <h3>Snapy</h3>
                        </div>
                        <div className="contacts">
                            {
                               contacts && contacts.map((ele, index) => {
                                    return (<div key={index} className={`contact ${index === currSeleted ? "selected" : ""}`} onClick={() => chagecurrentchat(index, ele)}>
                                        <div className="avtar">
                                            <img src={ele.avtarImage} alt="avtar" />
                                        </div>
                                        <div className="username">
                                            <h6>{ele.name}</h6>
                                        </div>
                                    </div>)
                                })
                            }


                        </div>
                        <div className="current-user">
                            <div className="avtar">
                                <img src={curruserImage} alt="avtar" />
                            </div>
                            <div className="username">
                                <h3>{curruserName}</h3>
                            </div>
                        </div>
                    </Container>)
            }

        </>
    )
}

export default Contact
