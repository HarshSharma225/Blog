import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData);
    const loading = useSelector(state => state.auth.loading);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    const userPosts = userData ? posts.filter(post => post.userId === userData.$id): []

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap justify-center items-center">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                    </div>
                </div>
            </Container>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                       </h1>
                    </div>
                </div>
                </Container>
            </div>
        )
    }

    if (userPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold mb-4">
                                You have no posts yet.
                            </h1>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" onClick={() => navigate('/add-post')} >
                                Create your first post
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {userPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home