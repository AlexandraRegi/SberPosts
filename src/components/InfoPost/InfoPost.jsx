import React, { useEffect, useState } from "react";
import './index.css';
import { ReactComponent as Like } from "../Post/img/like.svg"
import { BackNavigate } from "../BackNavigate/BackNavigate";
import { Comments } from '../Comments/Comments';
import { ReactComponent as Edit } from '../../assets/img/edit.svg'
import { Modal } from "../../components/Modal/Modal";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SendButton } from "../Buttons/Buttons";


export const InfoPost = ({post, onPostLike, sendComment, onDeleteComment, modalActive, setModalActive, sendUpdatedPost}) => {
    
    const { data: user } = useSelector((s) => s.user)
    const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });
    const [isLikedPost, setIsPostLike] = useState(false);
    const [img, setImg] = useState(`${post.image}`);
    const timeOptions = {
        day: 'numeric',
        month: 'short', year: "numeric"
    }

    useEffect(() => {
        const isLiked = post.likes.some(e => e === user?._id);
        setIsPostLike(isLiked)
    }, [post.likes, user]);

    const handleClick = () => {
        onPostLike(post, isLikedPost);
    }

    const onSendComment = (data) => {
        sendComment(data);
    }

    const onSendUpdatedPost = (data) => {
        sendUpdatedPost(data);
        reset()
        setModalActive(false);
    }

    const handleChangeImg = (event) => {
        setImg(event.target.value);
    }
    
    return (
    <div className="post__detail">
        <BackNavigate />
        <div className="header__post">
            <div className="author__post">
                <img className="avatar__post" src={post.author.avatar} alt="" />
                <div>
                    <div className="name__author">{post.author.name}</div>
                    <div className="about__author">{post.author.about}</div>
                </div>    
            </div>
            <div className="icon__post">
                <button className={`favorite ${isLikedPost ? 'favorite_active' : ' '}`} onClick={handleClick}>
                    <Like />
                    <span>{post.likes.length}</span>
                </button>
                {user?._id === post.author._id &&
                <div>
                    <Edit onClick={() => setModalActive(true)} className='edit__icon' />
                    <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <div className="incontent" >
                        <h2>Редактирование поста</h2>
                        <form className=" form-example" onSubmit={handleSubmit(onSendUpdatedPost)}>
                            <input className="form__input" placeholder='url картинки поста' type="text" {...register("image")} defaultValue={post.image} onChange={handleChangeImg} />
                            <img src={img} className="post_imageURL" width="100%" />
                            <input className="form__input" placeholder='Заголовок поста' type="text" {...register("title")} defaultValue={post.title} /> 
                            <textarea className="form__input" placeholder='Текст поста' type="text" {...register("text")} defaultValue={post.text} /> 
                            <input className="form__input" placeholder='введите тэги через запятую' {...register("tags")} type="text" defaultValue={post.tags} /> 
                            <SendButton variant="contained">Send</SendButton>
                        </form>
                    </div>
                    </Modal>
                </div>}
            </div>
        </div>
        <div className="post__content">
            <img className="post__img" src={post.image} alt="" />
            <div>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <div className="post__tags">
                    {post.tags.map(e=> <span className='tag' key={e}>{e}</span>)}
                </div> 
            </div>
            <div>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)}</div>
        </div>
        <Comments onDeleteComment={onDeleteComment} onSendComment={onSendComment} comments={post.comments} />    
    </div>
    )
}