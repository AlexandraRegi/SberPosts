import React from "react";
import "./index.css";
import { ReactComponent as Logo } from "./img/logo2.svg";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const Header = () => {
  const { data: user }  = useSelector(s => s.user)
      
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_wrapper_left">
            <Link to={'/'}><Logo className="logo-pic" /></Link>
            <div className="header_name">POSTS</div>   
        </div>
        <div className="header_wrapper_right">
          <Link to={'/profile'}>
            <img className="avatar" src={user.avatar} alt="" />
          </Link>
          <div>{user.name}</div>
        </div>
      </div>
    </header>
  );
};