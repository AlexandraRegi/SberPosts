import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyUser, updateUser } from '../../storage/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import './index.css'
import { useForm } from 'react-hook-form'
import LogoutIcon from '@mui/icons-material/Logout';
import { BaseButton, SendButton } from '../../components/Buttons/Buttons'
import { BackNavigate } from '../../components/BackNavigate/BackNavigate'


export const ProfilePage = () => {
    const {data: user, loading}  = useSelector(s => s.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });

    useEffect(() => {
        dispatch(getMyUser())
    }, [dispatch])

    const sendData = data => {
        dispatch(updateUser(data));
        reset()
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <>
            <BackNavigate />
            <div className='logout'>
                <h2>Профиль</h2>
                <BaseButton onClick={logout}><LogoutIcon /></BaseButton>
            </div>
            {loading || !user._id ? 'loading' :
                <div>
                    <div>
                        <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                            <div>
                                <input className="form__input" type="text" {...register("name")} placeholder="name" defaultValue={user.name} />
                            </div>
                            <div className="form__pass">
                                <input className="form__input" type="text" {...register("about")} placeholder="about me" defaultValue={user.about} />
                            </div>

                            <SendButton variant="contained">Send</SendButton>
                        </form>
                    </div>
                    <div>
                    <form className=" form-example" onSubmit={handleSubmit(sendData)}>
                        <img src={user?.avatar} className='profile__avatar' alt='this is avatar' />
                            <div>
                                <input className="form__input" type="text" {...register("avatar")} placeholder="avatar" />
                            </div>
                            <SendButton variant="contained">Send</SendButton>
                    </form>
                    </div>
                </div>
            }
            {/* {errors ? } */}
        </>
    )
}