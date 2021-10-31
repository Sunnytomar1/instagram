
import React from 'react';
import styled from 'styled-components';

import { getProviders, signIn as SignIntoProvider} from "next-auth/react";
import Header from '../../components/Header';

 function signIn({ providers }) {

   
    return (
        
        <>
        <Header/>
        <Out className="ot">
           
           <In>
           <img className="insta" src="https://links.papareact.com/ocw" alt=""/>
          <p className="p1">@2021 insta app developed by insta organisation</p>

           </In>
          


        <Val>
        {Object.values(providers).map((provider) => (
            
            <div key={provider.name}>
              <button className="provide" onClick={() => SignIntoProvider(provider.id,{callbackUrl: "/"})}>
                Sign in with {provider.name}
                
              </button>
            </div>
          ))}

        </Val>

        </Out>

        
        
    </>
       
    );
}
export async function getServerSideProps() {
    const providers = await  getProviders();

    return {
        props : {
            providers
           
        },
    }
}


export default signIn



const Out=styled.div `

`


const In=styled.div `



`




const Val=styled.div `

`