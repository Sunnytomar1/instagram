import React from 'react'
import styled from 'styled-components'

function Story({img,username}) {
    return (
        <Container>
            <img src={img} alt=""/>
    <p>{username}</p>
        </Container>
    )
}

export default Story


const Container=styled.div `
margin-top:1rem;

img{
    height:3.3rem;
    width:3.5rem;
    border-radius:9999px;
   
    padding: 0.2rem;
  border:2px solid #ef4444;
  cursor:pointer;
  object-fit: contain;

  transition:all .2s ease-out;

  :hover{
      transform:scale(1.1);
  }

}

p{
font-size:0.75rem;
width:3.5rem;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}

`