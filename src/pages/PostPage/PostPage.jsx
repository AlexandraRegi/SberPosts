import React, { useEffect, useCallback } from "react";
import { InfoPost } from "../../components/InfoPost/InfoPost";
import { useParams } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddPostComment, fetchChangePostLike, fetchDeletePostComment, fetchPostById, fetchUpdatedPost } from '../../storage/slices/postsSlice'


export const PostPage = ({modalActive, setModalActive}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((s) => s.posts)
    const user = useSelector(state => state.user.data);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }  
    }, [dispatch, id])

    const onPostLike = useCallback(async (item, wasLiked) => {
        dispatch(fetchChangePostLike({ post: item, wasLiked: wasLiked }))
    }, [dispatch, user?._id])

    const sendUpdatedPost = useCallback(async (data) => {
        dispatch(fetchUpdatedPost({_id: post._id, image: data.image, title: data.title, text: data.text, tags: data.tags.split(',')}));
    }, [dispatch, post._id])

    const sendComment = useCallback(async data => {
        dispatch(fetchAddPostComment({_id: post._id, data}));
    }, [dispatch, post._id])

    const onDeleteComment = useCallback(async id => {
        dispatch(fetchDeletePostComment({PostId: post._id, CommentId: id}));
    }, [dispatch, post._id])
    
    return (
        <>
        {!!Object.keys(post).length ?
            <InfoPost sendUpdatedPost={sendUpdatedPost} post={post} onPostLike={onPostLike} sendComment={sendComment} onDeleteComment={onDeleteComment} modalActive={modalActive} setModalActive={setModalActive}/>
        :
            <div>Loading...</div>}
        </>
    )
}