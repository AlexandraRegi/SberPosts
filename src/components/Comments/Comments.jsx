import React, { useState } from "react";
import s from './index.module.css'
import { ReactComponent as Basket } from '../../assets/img/basket.svg'
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { BaseButton, SendButton } from "../Buttons/Buttons";


export const Comments = ({ onSendComment, comments, onDeleteComment }) => {

    const { data: user } = useSelector((s) => s.user)
    const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });
    const [showForm, setShowForm] = useState();
    const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
    }
    const CommentRegister = {
        required: {
            value: true,
            message: "Обязательное поле для заполнения"
        }
    }

    const onSendFormComment = ({text}) => {
        onSendComment({ text });
        reset();
        setShowForm(false)
    }

    return (
        <>
            <div className={s.comments__controls}>
                <h2>Комментарии</h2>
                <BaseButton type="submit" variant="contained" onClick={() => setShowForm(true)}>Оставить комментарий</BaseButton>
            </div>
            {showForm &&
                <form className={s.comments__form} onSubmit={handleSubmit(onSendFormComment)} >
                    <textarea  {...register("text", CommentRegister)} type="text" placeholder="Оставьте ваш комментарий" className={s.form__input} />
                    <div>
                        <SendButton variant="contained">Send</SendButton>
                    </div>
                    
                </form>}
            <div className={s.comments__list}>
                {comments.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((e) =>
                    <div key={e._id}>
                        <div className={s.comments__item} >
                            <div className={s.comments__author}>
                                <img className={s.avatar} src={e.author.avatar} alt="" />
                                <span>{e.author.name}</span>
                                <span className={s.comments__date}> {new Date(e.created_at).toLocaleString('ru-RU', timeOptions)}</span>
                                {user?._id === e.author._id &&
                                    <Basket onClick={() => onDeleteComment(e._id)} className={s.comments__basket} />
                                }
                            </div>
                            <div>{e.text}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}