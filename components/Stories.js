import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import faker from "faker"
import Story from "./Story"
import { useSession } from 'next-auth/react';

function Stories() {

    const [suggestions,setSuggestions] = useState([]);
    const {data:session} = useSession();

useEffect(() => {
    const suggestions = [...Array(20)].map((_,i) => (
{
...faker.helpers.contextualCard(),
id:i,

}


    ));
   //console.log(suggestions)
   setSuggestions(suggestions);

}, [])


    return (
        <Container >

{session && (
    <Story img={session.user.image}
        username={session.user.username}/>
)}

            {suggestions.map((profile) => (

         <Story Key={profile.id} img={profile.avatar} username={profile.username}/>

         ))}

        </Container>
    )
}

export default Stories


const Container=styled.div `
display:flex;
align-items:center;
padding:1rem;

gap: 14px;
margin-top:2rem;
background-color:white;

border:3.3px solid #fafafa;
overflow:scroll;


  
  
 



`