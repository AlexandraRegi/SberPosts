import React from 'react'
import './index.css'
import { Post } from '../Post/Post'


export const PostList = ({posts}) => {
    return (
    <div className='posts'>
        {posts.map(item => <Post key={item._id} {...item} post={item} />
        )}
    </div>
    )
}