import React, { useCallback, useState } from "react";
import '../index.css'
import { useForm } from "react-hook-form";
import { emailRegister, passwordRegister } from "../Login/Login";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { resetPass, resetPassWithToken } from "../../../storage/slices/authSlice";


export const ResetPass = () => {

    const [haveToken, setHaveToken] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });

    const sendData = useCallback(async (data) => {
        if (data.token) {
            dispatch(resetPassWithToken(data));
        } else {
            dispatch(resetPass(data));
            setHaveToken(true);
        }
    }, [dispatch])

    return (<>
        <div className="incontent" >
            <h3>Восстановление пароля</h3>
            <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                {haveToken ?
                    <>
                        <div>
                            <input className="form__input" type="text" {...register("token", { ...emailRegister })} placeholder="token" />
                            {errors?.token && <span> {errors?.token.message}</span>}
                        </div>
                        <div>
                            <input className="form__input" type="password" {...register("password", { ...passwordRegister })} placeholder="password" />
                            {errors?.password && <span> {errors?.password.message}</span>}
                        </div></>
                    : <></>}
                <div>
                    <Link className="auth__link" to={'/login'}>Я вспомнил пароль</Link>
                </div>
                <Button type="submit" size="small" color="secondary" variant="contained">Восстановить пароль</Button>
            </form>
        </div>
    </>)
}