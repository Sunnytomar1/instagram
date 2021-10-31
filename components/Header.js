import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import TelegramIcon from '@material-ui/icons/Telegram';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {signIn, signOut, useSession} from "next-auth/react"
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {

const {data:session} = useSession();

const [open,setOpen] = useRecoilState(modalState);

const router = useRouter();

 console.log(session);


    return (
        <Container>
        
<Navbar>



<Left onClick={() => router.push('/')}>
    <Image src="https://links.papareact.com/ocw"
    layout="fill"
   objectFit="contain"
    />

</Left>

<LeftLogo onClick={() => router.push('/')}>
    <Image src="https://links.papareact.com/jjm"
      layout="fill"
      objectFit="contain"
    />
</LeftLogo>



<MiddleContain>

<Middle>
    <SearchIc>
        <SearchIcon className="first"/>
    </SearchIc>

<input className="It" type="text" placeholder="Search"/>

</Middle>


</MiddleContain>


<Right>
<HomeIcon onClick={() => router.push('/')} className="r1"/>
<MenuIcon className="r2"/>


{session ? (
<>
<Tel>
<TelegramIcon className="r3"/>
<Number>4</Number>
</Tel>

<AddToPhotosIcon  onClick={() => setOpen(true)} className="r4"/>
<FavoriteBorderIcon className="r5"/>
<img onClick={signOut} src={session.user.image}  alt="profile pic"/>
</>
)



: (


<button onClick={signIn}>Sign In</button>

)}



</Right>



</Navbar>


        </Container>
    )
}

export default Header


const Container=styled.div `
background-color:#fafafa;
--tw-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
position:sticky;
top:0;



z-index:100;


`


const Navbar=styled.div `
display:flex;
align-items:center;
justify-content:space-between;
max-width:72rem;
margin-left: 1.25rem;
margin-right: 1.25rem;
background-color:#fafafa;
@media (min-width: 1024px){
    margin-left: auto;
    margin-right: auto;
}

@media(max-width:768px){
    margin-left:auto;
    margin-right:auto;
}



`



const Left=styled.div `
position:relative;
height:5rem;
width:10rem;
cursor:pointer;
@media(max-width:1000px){
    display:none;
}

@media(min-width:1024px){
   display:inline-grid;
}

`


const LeftLogo=styled.div `
position:relative;

width:2.5rem;
height:2.5rem;
flex-shrink:0;
cursor:pointer;
@media(min-width:1024px){
    display:none;
}


`

const MiddleContain=styled.div `
width:15rem;


`




const Middle=styled.div `
position:relative;
margin-top:0.25rem;

border-radius: 0.375rem;


.It{
  
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity));
padding-left:2.5rem;
padding-top:0.5rem;
padding-bottom:0.5rem;
border-radius:0.4rem;
font-weight:700;
min-width:20vw;

:focus{
    outline:none;
    --tw-border-opacity: 1;
    border-color: rgba(0, 0, 0, var(--tw-border-opacity));
}

@media(max-width:700px){
    --tw-border-opacity: 1;
    border-color: rgba(209, 213, 219, var(--tw-border-opacity));
    border-radius:0.4rem;

    
    
}


}


`

const SearchIc=styled.div `
position:absolute;
top:0px;
bottom:0px;
padding-left: 0.75rem;
display:flex;
align-items:center;
pointer-events: none;


.first{
    font-size:1.25rem;
    --tw-text-opacity: 1;
color: rgba(107, 114, 128, var(--tw-text-opacity));
}

`



const Right=styled.div `


display:flex;
align-items:center;
justify-content: flex-end;
min-width:17vw;
justify-content:space-between;


.r1{
    height:1.8rem;
    width:1.8rem;

    
        cursor:pointer;
   transition:all .2s ease-out;
        :hover{
            transform:scale(1.2);
        }

        @media(max-width:700px){
            display:none;
        }
    
}

.r2{
    height:1.8rem;
    width:1.8rem;
cursor:pointer;
    @media(min-width:768px){
        display:none;
    }
   
    
}

.r3{
height:1.8rem;
width:1.8rem;


@media(max-width:768px){
    display:none;
}

@media(min-width:768.1px){
    display: inline-flex;
    cursor:pointer;
   transition:all .2s ease-out;
        :hover{
            transform:scale(1.2);
        }
}

}

.r4{
    height:1.8rem;
    width:1.8rem;

    @media(max-width:768px){
        display:none;
    }

    @media(min-width:768.1px){
        display: inline-flex;
   cursor:pointer;
   transition:all .2s ease-out;
        :hover{
            transform:scale(1.2);
        }
    }
    
}
.r5{
    height:1.8rem;
width:1.8rem;

@media(max-width:768px){
    display:none;
}


@media(min-width:768.1px){
    display: inline-flex;
    cursor:pointer;
   transition:all .2s ease-out;
        :hover{
            transform:scale(1.2);
        }
}

  }




  img{
      height:2.5rem;
      border-radius:9999px;
      cursor:pointer;
  }


`

const Tel=styled.div `
position:relative;

`



const Number=styled.div `
position:absolute;
top:-28%;
left:70%;
height:20px;
width:20px;

--tw-bg-opacity: 1;
background-color: rgba(239, 68, 68, var(--tw-bg-opacity));

display:flex;
align-items:center;
border-radius:9999px;
justify-content:center;
color:white;
animation: pulse 1s infinite;
@media(max-width:768px){
    display:none;
}
`