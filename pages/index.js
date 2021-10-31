import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'




export default function Home() {
  return (
    <Container>
      <Head>
        <title>Instagram</title>
       
      </Head>

   <Modal/>
  <Header />

<Feed />

    </Container>
  )
}


const Container=styled.div `

--tw-bg-opacity: 1;
background-color: rgba(249, 250, 251, var(--tw-bg-opacity));


`