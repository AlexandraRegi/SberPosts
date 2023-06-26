import React from "react";
import './index.css'
import cn from 'classnames'


export const Modal = ({setModalActive, modalActive, children}) => {
    return (
    <div className={cn("modal", { 'active': modalActive })}>
        <div className={cn("modal__content", { 'active': modalActive })}>
            <span className="modal__close" onClick={() => setModalActive(false)}>x</span>
            {children}
        </div>
    </div>)
}