import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import ButtonLoader from 'components/layout/ButtonLoader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from 'redux/actions/authAction';
import { REGISTER_USER } from 'redux/constants/authConstant';

export default function Register() {
    const dispatch = useDispatch();
    const { loader, success, error } = useSelector((state) => state.user);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpeg');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const Data = {
            ...userData,
            avatar,
        };
        dispatch(registerAction(Data));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            setUserData((preState) => ({
                ...preState,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        if (loader.includes(REGISTER_USER.pending)) {
            setLoading(true);
        }else{
            setLoading(false);
        }

        if (error) {
            toast.error(error);
        }

        if (Object.keys(success).length) {
            router.push('/login')
        }
    }, [loader, error, success, dispatch]);

    return (
        <>
            <div className='container container-fluid'>
                <div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg'>
                            <h1>Join Us</h1>
                            <div className='form-group'>
                                <label htmlFor='name_field'>Full Name</label>
                                <input type='text' name='name' id='name_field' className='form-control' value={userData.name} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email_field'>Email</label>
                                <input type='email' name='email' id='email_field' className='form-control' value={userData.email} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password_field'>Password</label>
                                <input type='password' name='password' id='password_field' className='form-control' value={userData.password} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='avatar_upload'>Avatar</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3 item-rtl'>
                                            <img src={avatarPreview} className='rounded-circle' alt='image' />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input type='file' name='avatar' id='customFile' accept='image/*' onChange={handleChange} />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button id='register_button' onClick={handleSubmit} className='btn btn-block py-3' disabled={loading}>
                                {loading ? <ButtonLoader /> : 'REGISTER'}
                            </button>
                            <div className='text-center my-3'>
                                <Link href={'/login'}>Already have account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

