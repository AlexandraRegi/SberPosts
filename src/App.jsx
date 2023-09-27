import './App.css';
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PostPage } from './pages/PostPage/PostPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { PostListPage } from './pages/PostListPage/PostListPage';
import { Modal } from './components/Modal/Modal';
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { useDispatch } from "react-redux";
import { getMyUser } from "./storage/slices/userSlice";
import { fetchPosts } from "./storage/slices/postsSlice";
import { PageNotFound } from './pages/PageNotFound/PageNotFound'
import { parseJwt } from "./utils/utils";


function App() {
  const [modalActive, setModalActive] = useState(false);
  const [isAuthorized, setAuth] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyUser()).then(() => dispatch(fetchPosts()))
    const token = parseJwt(localStorage.getItem('token'));
    if (token && (new Date() < new Date(token?.exp * 1e3))) {
      setModalActive(false)
      setAuth(true); 
      dispatch(getMyUser()).then(() => dispatch(fetchPosts())) 
    } else {
      //setModalActive(true)
      //navigate('/login')
    }
  }, [ dispatch, localStorage.getItem('token')]);

  return (
    <>
      <Header />
      <main className='content'>
      {isAuthorized ?
        <Routes>
          <Route path='/' element={<PostListPage modalActive={modalActive} setModalActive={setModalActive} />} />
          <Route path='/post/:id' element={<PostPage modalActive={modalActive} setModalActive={setModalActive} />} />
          <Route path="/profile" element={<ProfilePage setModalActive={setModalActive} />} />
          <Route path="/register" element={
            <Modal modalActive={modalActive} setModalActive={setModalActive} >
              <RegisterForm />
            </Modal>} />
          <Route path="/login" element={
            <Modal modalActive={modalActive} setModalActive={setModalActive} >
              <LoginForm />
            </Modal>} />
          <Route path="/reset-pass" element={
            <Modal modalActive={modalActive} setModalActive={setModalActive} >
              <ResetPass />
            </Modal>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        :
        <Navigate to={'/not-found'} />
      }
      </main>
      <Footer />
    </>
  );
}

export default App;