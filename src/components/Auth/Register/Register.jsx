import React, { useCallback, useState } from "react";
import { useForm } from 'react-hook-form';
import '../index.css'
import { Link, useNavigate } from "react-router-dom";
import { emailRegister, passwordRegister } from "../Login/Login";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { registration } from "../../../storage/slices/authSlice";


export const RegisterForm = () => {

    const [type, setType] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const sendData = useCallback(async (data) => {
        dispatch(registration(data).then(()=> navigate('/login')));
    }, [dispatch])

    return (
        <div className="incontent" >
            <h3>Регистрация</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div>
                    <input className="form__input" type="number" {...register("group")} placeholder="group" />
                    {errors?.group && <span> {errors?.group.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="password" />
                    <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="auth__link" to={'/login'}>Я уже зарегистрирован</Link>
                </div>
                <Button type="submit" size="small" color="secondary" variant="contained">Зарегистрироваться</Button>
            </form>
        </div>
    )
}