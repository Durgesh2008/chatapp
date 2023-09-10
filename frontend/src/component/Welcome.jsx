import React from 'react'
import styled from 'styled-components'

import robo from '../asset/robo.gif'

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    img{
        width:30%;
    }
    h1{
        color:#282dc0;
    }
    h3{
        color:#c7a115;
    }
`

const Welcome = ({ curruser }) => {
  return (
    <Container>
      <img src={robo} alt="Robot" />
      <h1>Welcome <span>{curruser.user.name}</span></h1>
      <h3>Please select chat to start messaging</h3>
    </Container>
  )
}

export default Welcome
