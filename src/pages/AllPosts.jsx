import React, {useState,useEffect} from 'react'
import appwriteService from "../appwrite/config"
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    const userPosts = userData ? posts.filter(post => post.userId === userData.$id) : [];

    return (
    <div className='w-full py-8'>
        <Container>
            {userPosts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
            ))}
        </Container>
    </div>
  )
}

export default AllPosts