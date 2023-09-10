import React from 'react'
import {  useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const Container=styled.div`
  i{
    font-size:1.8rem;
    color:white;
    cursor: pointer;
    @media screen and (min-width:720px ) and (max-width:1080px){
              font-size: 1.3rem;
            }

  }
`
const Logout = () => {
  const navigate=useNavigate();
  const handleclick=()=>{
    localStorage.clear();
  navigate('/login')
  }
  return (
    <Container >
      <i onClick={handleclick} className="fa-solid fa-power-off"></i>
    </Container>
  )
}

export default Logout
