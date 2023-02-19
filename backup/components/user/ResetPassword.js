import ButtonLoader from 'components/layout/ButtonLoader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from 'redux/actions/authAction';
import { RESET_PASSWORD } from 'redux/constants/authConstant';

export default function ResetPassword ()  {
    const dispatch = useDispatch();
    const router = useRouter();
    const { resetPasswordMessage, loader, error } = useSelector((state) => state.user);
    const [userData, setUserData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUserData((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(resetPassword(router.query.token, userData));
    };

    useEffect(() => {
        if (loader.includes(RESET_PASSWORD.pending)) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        if (error) {
            toast.error(error);
        }
        if (resetPasswordMessage) {
            toast.success(resetPasswordMessage);
        }
    }, [loader, dispatch, error, resetPasswordMessage]);

    return (
        <>
            <div className='container fluid-container'>
                <div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg'>
                            <div className='form-group'>
                                <label htmlFor='password_field'>Password</label>
                                <input type='password' name='password' id='password_field' placeholder='Password' className='form-control' value={userData.password} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='confirm_password_field'>Confirm Password</label>
                                <input type='password' name='confirmPassword' id='confirm_password_field' placeholder='Confirm Password' className='form-control' value={userData.confirmPassword} onChange={handleChange} />
                            </div>
                            <button id='forgot_button' onClick={handleSubmit} className='btn btn-block py-3' disabled={loading}>
                                {loading ? <ButtonLoader /> : 'RESET'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

