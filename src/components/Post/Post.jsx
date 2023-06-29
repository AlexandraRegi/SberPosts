import React, { useCallback } from "react";
import './index.css';
import { ReactComponent as Like } from "./img/like.svg";
import { Link } from "react-router-dom";
import { ReactComponent as Basket } from '../../assets/img/basket.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChangePostLike, fetchDeletePost } from '../../storage/slices/postsSlice';


export const Post = ({post}) => {
    
    const dispatch = useDispatch();
    const {data: user}  = useSelector(s => s.user)
    const isLiked = post.likes.some(e=> e === user._id)
    const timeOptions = {
        day: 'numeric',
        month: 'short', year: "numeric"
    }
    
    const handleClick = () => {
        dispatch(fetchChangePostLike({ post: post, wasLiked: isLiked }))
    }

    const onDeletePost = useCallback(async _id => {
        dispatch(fetchDeletePost(post._id))   
    }, [dispatch, post._id])

    return (
        <div className="post">
            <div>
                <div className="header-post">
                    <div className="about-author">
                        <img className="avatar" src={post.author.avatar} alt="" />
                        <div>{post.author.name}</div>
                    </div>
                    {user?._id === post.author._id &&
                    <div className="icon">
                        <Basket onClick={() => onDeletePost(post._id)} className='basket-icon' />
                    </div>}    
                </div>
                <Link to={`/post/${post._id}`} className="post__link">
                <div className="post-content">
                    <img className="post__image" src={post.image} alt="" />
                    <div className="info-post">
                        <h3>{post.title}</h3>
                        <p className="about-post">{post.text}</p>
                        <div className="tags">
                            {post.tags.map(e=> <span className='tag' key={e}>{e}</span>)}
                        </div>  
                    </div>
                </div>
                </Link>
            </div>
            <div className="post-footer">
                <button onClick={handleClick} className={`post__favorite ${isLiked ? 'post__favorite_active' : ' '}`}>
                    <Like />
                    <span>{post.likes.length}</span>
                </button>
                <div>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)}</div>
            </div>
        </div>
    )
}