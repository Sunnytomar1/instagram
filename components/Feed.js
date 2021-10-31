import { useSession } from 'next-auth/react'
import React from 'react'
import styled from 'styled-components'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

function Feed() {

    const {data:session} = useSession();
    return (
        <Container>
            

  <SectionLeft>

<Stories />
<Posts/>

  </SectionLeft>


{session && (
    <SectionRight>

<Right>

<MiniProfile/>
<Suggestions/>

</Right>


  </SectionRight>

)}
  


        </Container>
    )
}

export default Feed


const Container=styled.div `


display:grid;
grid-template-columns: repeat(1, minmax(0, 1fr));

@media(min-width:768px){
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 48rem;
}

@media(min-width:1280px){
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-width: 72rem;
    margin-left: auto;
margin-right: auto;
}





`



const SectionLeft=styled.div `

grid-column: span 2 / span 2;


`



const SectionRight=styled.div `





@media(max-width:800px){
    display:none;
}

@media(min-width:1280px){
   // display:inline-grid
}

@media(min-width:768px){
    grid-column: span 1 / span 1;
}

`


const Right=styled.div `

position:fixed;


`