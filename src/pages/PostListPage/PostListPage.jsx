import React, { useCallback, useEffect, useState } from "react";
import { PostList } from "../../components/PostList/PostList";
import { useForm } from "react-hook-form";
import { Modal } from "../../components/Modal/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddNewPost } from '../../storage/slices/postsSlice'
import Pagination from '@mui/material/Pagination';
import { BaseButton, SendButton } from "../../components/Buttons/Buttons";


export const PostListPage = ({modalActive, setModalActive}) => {
  
  const creationRegister = { required: 'Обязательное поле для заполнения' }
  const titleRegister = {
    required: {
        value: true,
        message: "Обязательное поле для заполнения"
    },
    pattern: {
        value: /^[A-Za-z\d]{2,}$/,
        message: 'Заголовок должен содержать хотя бы два символа'
    }
  }
  
  const { posts, loading } = useSelector((s) => s.posts)
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" });

  //Pagination
  const [postsOnPage, setPostsOnPage] = useState(posts);
  const [page, setPage] = useState(1);

  const countCardOnPage = 12
  const countPage = Math.ceil(posts.length/countCardOnPage)
  
  const handleChangePage = (event, e) => {
    setPage(e)
  }

  useEffect(() => {
        if(page !== '') {            
          const lastIndex = page * countCardOnPage;
          const startIndex = lastIndex - countCardOnPage;

            if (posts.length>0) {
                const newPosts = posts.length>0 ? posts.slice(startIndex, lastIndex) : posts
                setPostsOnPage(newPosts)
            }
        }
  }, [page, posts])
  //-------------------
  const sendPost = useCallback(async data => {
    dispatch(fetchAddNewPost({image: data.image, title: data.title, text: data.text, tags: data.tags.split(',')}));
    reset()
    setModalActive(false);
  }, [dispatch, posts._id])

  return (
    <div>
      <div>
        <BaseButton onClick={() => setModalActive(true)} variant="contained">Создать пост</BaseButton>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <div className="incontent" >
            <h3>Создание поста</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendPost)}> 
              <input className="form__input" placeholder='url картинки поста' type="text" {...register("image", { ...creationRegister })}   />
              {errors?.image && <span> {errors?.image.message}</span>}
              <input className="form__input" placeholder='Заголовок поста' type="text" {...register("title", { ...titleRegister })}   /> 
              {errors?.title && <span> {errors?.title.message}</span>}
              <textarea className="form__input" placeholder='Текст поста' type="text" {...register("text", { ...creationRegister })}   /> 
              {errors?.text && <span> {errors?.text.message}</span>}
              <input className="form__input" placeholder='введите тэги через запятую' {...register("tags")} type="text"   /> 
              <SendButton variant="contained">Send</SendButton>
            </form>
        </div>
        </Modal> 
      </div>
      <div>
        <PostList posts={postsOnPage} loading={loading} />
      </div>
      <div className="pagination">
        <Pagination count={countPage} color="secondary" onChange={handleChangePage} />
      </div>
    </div>
  );
};