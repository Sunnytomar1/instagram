import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { modalState } from '../atoms/modalAtom'
import {Dialog,Transition} from "@headlessui/react"
import {Fragment} from "react"
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useRef } from 'react'
import { useState } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'


function Modal() {
   const {data:session} = useSession();
    const [open,setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef=useRef(null);
    const [loading,setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const uploadPost = async () => {
        if(loading) return;

        setLoading(true);

        //1)create a post and add to firebase 'posts' collection
        //2)get the post ID for newly created post
        //3)upload the image to firebase storage with the post ID
        //4)get a download url from fb storage and update to original post with image

        const docRef = await addDoc(collection(db,'posts'),{
            username : session.user.username,
            caption : captionRef.current.value,
            profileImg : session.user.image,
            timestamp : serverTimestamp(),
        })

        console.log("new doc added with ID", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef,selectedFile,"data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db,'posts',docRef.id), {
                ima:downloadURL
            })
        }) ;

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);

    }

    const addImageToPost = (e) =>{
     const reader = new FileReader();
     if(e.target.files[0]){
         reader.readAsDataURL(e.target.files[0]);
     }

     reader.onload = (readerEvent) =>{
      setSelectedFile(readerEvent.target.result);
     };

    }
  
    //const filePickerRef = useRef(null);
   // const [selectedFile, setSelectedFile] = useState(null);
    //const addImageToPost = (e) => {

    //}

    return (
        
               
      <Transition.Root show={open} as={Fragment}>

          <Dialog as="div"   onClose={setOpen} >
       

<Container>
<Content>


{selectedFile ? (
<img className="sk" src={selectedFile} onClick={()=> setSelectedFile(null)} alt=""/>

): (
<Camera onClick={() => filePickerRef.current.click()}>
<CameraAltIcon className="c"/>
</Camera>

)}


<Dialog.Title as="h3" className="tt">
    Upload a photo
</Dialog.Title>

<BeforeInput>
<input className="bc" ref={filePickerRef} type="file"  hidden onChange={addImageToPost}/>
</BeforeInput>




<AfterInput>
    <textarea className="t1" placeholder="Enter a caption..." ref={captionRef}>
       
    </textarea>
</AfterInput>

<Button disabled={!selectedFile} onClick={uploadPost}>
{loading ? "Uploading" : "Upload Post"}
</Button>

</Content>



</Container>

       
       
      
          </Dialog>



      </Transition.Root>            


  )
}

export default Modal


const Container=styled.div `
position:fixed;
top:0;
bottom:0;
left:0;
right:0;
z-index:9999;
background-color:rgba(0,0,0,0.8);

`


const Content=styled.div `
width:100%;
max-width:452px;
background-color:white;
border-radius:5px;
max-height:90%;
position:relative;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
top:222px;
margin:0 auto;
padding:2rem;
`

const Camera=styled.div `

cursor:pointer;
.c{
    font-size:40px;
}
`




const BeforeInput=styled.div `

`


const AfterInput=styled.div `

width:100%;

margin-top:15px;

    

    padding:0.6rem;
   font-weight:800;
   font-size:1rem;
  border-style:none;


:focus{
    outline:none;
}

.t1{
    width:100%;
    height:40px;
    border-style:none;
   font-weight:800;
   font-size:16px;
  
    :focus{
        outline:none;
    }
}



`

const Button=styled.button `

height:40px;
width:40%;
--tw-bg-opacity: 1;
background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
font-size:18px;
color:white;
font-weight:800;
border:1px solid white;
cursor:pointer;
margin-top:0.5rem;




:hover{
    --tw-bg-opacity: 1;
background-color: rgba(220, 38, 38, var(--tw-bg-opacity));
}
`





