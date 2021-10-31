import { collection, onSnapshot, onSnapshotsInSync, orderBy, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../firebase'
import Post from './Post'

//const posts= [
//{
//id:'123',
//username:'st133',
//userImg:'/images/user-4.jpg',
//img:'/images/nat-4.jpg',
//caption:'subscribe and comment '
//},


//{//
  //  id:'123',
  //  username:'st133',
   /// userImg:'/images/user-4.jpg',
   // img:'/images/nat-4.jpg',
   // caption:'subscribe and comment '

   // },
    



//]

function Posts() {

    const [posts,setPosts] = useState([])

    useEffect(() => onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),
    (snapshot) => {
        setPosts(snapshot.docs);
    }
    
    ))

    console.log(posts);
    return (
        <Container>




  {posts.map((post)=> (
<Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().ima} caption={post.data().caption} />

  ))}
 
        
        </Container>
    )
}

export default Posts


const Container=styled.div `


`


/*{posts.map((post) => (
<Post
key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption}
/>

  ))}*/ 