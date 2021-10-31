import React from 'react'
import styled from 'styled-components'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoodIcon from '@material-ui/icons/Mood';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
import Moment from "react-Moment";
import FavoriteIcon from '@material-ui/icons/Favorite';




function Post({id,username,userImg,img,caption}) {

    const {data:session} = useSession();
    const [comment,setComment] = useState("");
    const [comments,setComments] = useState([]);
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);
    



  useEffect(() => onSnapshot(query(collection(db,'posts',id,'comments'),orderBy("timestamp","desc")),
    (snapshot) => setComments(snapshot.docs)
  
  ), 
  [db,id])


useEffect(() => onSnapshot(collection(db, 'posts', id, 'likes'),
(snapshot) => setLikes(snapshot.docs)
),
[db,id]
);


useEffect(() => 
 setHasLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !==-1
 )

,[likes]);


const likePost = async () => {

    if(hasLiked){
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
    } else{
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {

            username: session.user.username
        });
    };

    };

   
     console.log(hasLiked);
console.log(likePost)


    const sendComment = async(e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db,"posts",id,"comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),

        })
    }



  


    return (
        <Container>
            <Top>
            <img src={userImg} alt=""/>
        <p>{username}</p>
        <MoreHorizIcon/>

            </Top>


<Middle>

<img src={img}/>
</Middle>


{session && (
    <Buttons>

    
<Left>

{hasLiked ? (

<FavoriteIcon onClick={likePost} className="fill"/>
) : (

<FavoriteBorderIcon onClick={likePost} className="i1" />
)

}




<CommentIcon className="i2"/>
<SendIcon className="i3"/>

</Left>

<Right>

<BookmarkBorderIcon/>
</Right>

</Buttons>


)}



   <Caption>
    <p>

{likes.length>0 && (
    <p className="pp">{likes.length} likes</p>
)}

    <span>{username}</span>
    {caption}
    </p>
    </Caption>



{comments.length>0 && (
<Commenting>
{comments.map((comment) => (
  <ContentBox key={comment.id}>
<img src={comment.data().userImage} alt=""/>
<p><span>{comment.data().username}</span>{comment.data().comment}</p>
<Moment className="mnt" interval={10} fromNow>
    {comment.data().timestamp?.toDate()}
</Moment>
  </ContentBox>

))}

</Commenting>


)}




{session && (

<Form>

<MoodIcon/>
<input value={comment} onChange={(e) => setComment(e.target.value)}  className="in" type="text" placeholder="Add a comment..."/>
<button className="pt" onClick={sendComment} >Post</button>

    </Form>

)}
   
           
        </Container>
    )
}

export default Post

const Container=styled.div `
background-color:white;
margin-top: 1.75rem;
margin-bottom: 1.75rem;
border:3px solid #f7f7f7;
`


const Top=styled.div `
display:flex;
align-items:center;
padding:1.25rem;


img{
    height:3rem;
    width:3rem;
    border-radius:9999px;
    object-fit: contain;
    padding:0.23rem;
    border:2px solid #aaa;
    margin-right:1rem;
    
}

p{
    flex-grow:1;
    font-weight:700;
}


`

const Middle=styled.div `
img{
   
   width:100%;
   object-fit: cover;
}
`


const Buttons=styled.div `
display:flex;
padding-left: 1rem;
padding-right: 1rem;
padding-top:1rem;




`

const Left=styled.div `
display:flex;
align-items:center;
gap:30px;
flex-grow:1;
p{
    color:black;
}
.i1{
    cursor:pointer;
    transition:all .2s ease-out;
      :hover{
          transform:scale(1.1);
      }
  }
  
  .i2{
      cursor:pointer;
      transition:all .2s ease-out;
      :hover{
          transform:scale(1.1);
      }
  }
  
  .i3{
      cursor:pointer;
      transition:all .2s ease-out;
      
      :hover{
          transform:scale(1.15);
      }
  
  }
`


const Right=styled.div `


`

const Caption=styled.div `
p{
    padding: 1.25rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    
}

span{
    margin-right:0.5rem;
    font-weight:700;
}

`


const Form=styled.div `
display:flex;
.in{
    padding:0.5rem;
    border-style: none;
    flex-grow:1;
  
    :focus{
        outline:none;
    }

}

`


const Commenting=styled.div `
margin-left: 2.5rem;
height: 5rem;
overflow-y: scroll;

`


const ContentBox=styled.div `
display:flex;
align-items:center;
gap:1rem;
margin-bottom:1rem;

img{
    height:2rem;
    border-radius:9999px;
}


p{
    width:100%;
    flex-grow:1;

    span{
        font-weight:800;
        margin-right:1rem;
    }
}
`




