import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import faker from "faker"

function Suggestions() {

const [suggestions,setSuggestions] = useState([]);

useEffect(() => {
   
     const suggestions = [...Array(5)].map((_,i) => (

        {
            ...faker.helpers.contextualCard(),
            id:i
        }

     ))

     setSuggestions(suggestions);

}, []);


    return (
        <Container>
            
            <TextContain>
                <h3>Suggestions for you</h3>
                <Button>See All</Button>
            </TextContain>


            {
suggestions.map((profile) => (
<Box key={profile.id}>
<img src={profile.avatar}/>



<Profile>
<h2>{profile.username}</h2>
<h3>Works at {profile.company.name}</h3>
</Profile>

<Bt>
    Follow
</Bt>



</Box>

))}

        </Container>
    )
}

export default Suggestions

const Container=styled.div `
margin-top:1rem;
margin-left:2.5rem


`

const TextContain=styled.div `
display:flex;
align-items:center;
justify-content:space-between;

h3{
    font-size: 0.875rem;
    --tw-text-opacity: 1;
color: rgba(156, 163, 175, var(--tw-text-opacity));
font-weight:700;
}

`

const Button=styled.div `
--tw-text-opacity: 1;
color: rgba(75, 85, 99, var(--tw-text-opacity));
font-weight:600;

`

const Box=styled.div `
display:flex;
align-items:center;
justify-content:space-between;
margin-top:5px;
img{
    height:2.5rem;
    width:2.5rem;
    border-radius:9999px;
    
}

`

const Profile=styled.div `
flex-grow:1;
margin-left:1rem;
h2{
    font-weight:600;
    font-size: 0.875rem;
}

h3{
    font-size: 0.75rem;
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
}

`

const Bt=styled.div `

font-size:0.88rem;
margin-left:1.5rem;
--tw-text-opacity: 1;
color: rgba(96, 165, 250, var(--tw-text-opacity));
font-weight:700;
cursor:pointer;
`