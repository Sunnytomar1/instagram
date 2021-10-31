import React from 'react'
import styled from 'styled-components'
import {signOut,useSession} from "next-auth/react"

function MiniProfile() {


    const { data: session } = useSession();
   console.log(session);

    return (

        
        <Container>
            <ImageContain>
            <img src={session?.user?.image} alt=""/>
            </ImageContain>
            
            <TextContain>
    <h3>{session?.user?.username}</h3>
<p>Welcome to Instagram</p>


            </TextContain>

            <Button onClick={signOut}>
              Sign Out
            </Button>

        </Container>
    )
}

export default MiniProfile


const Container=styled.div `
display:flex;
align-items:center;
justify-content:space-between;
margin-top:3.5rem;
margin-left:2.5rem;


`

const ImageContain=styled.div `

img{
    height:3.5rem;
    width:3.5rem;
    border-radius:9999px;
   
    
}


`

const TextContain=styled.div `

flex-grow:1;
margin-left: 1rem;
margin-right: 1rem;
p{
    margin-top:-1rem;
    --tw-text-opacity: 1;
color: rgba(156, 163, 175, var(--tw-text-opacity));
font-size: 0.875rem;

}

`


const Button=styled.div `
cursor:pointer;
--tw-text-opacity: 1;
color: rgba(96, 165, 250, var(--tw-text-opacity));
font-weight:700;
font-size: 0.875rem;
`


