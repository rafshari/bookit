import React, { useEffect, useState } from 'react';
import ButtonLoader from 'components/layout/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from 'redux/actions/authAction';
import { FORGOT_PASSWORD } from 'redux/constants/authConstant';
import { toast } from 'react-toastify';

export default function ForgotPassowrd  () {
    const { forgotPasswordMessage, loader, error } = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState('');
    const dispatch = useDispatch();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmail(value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(forgotPasswordAction({ email }));
    };

    useEffect(() => {
        if (loader.includes(FORGOT_PASSWORD.pending)) {
            setLoading(true);
        } else {
            setLoading(false);
        }
        if (error) {
            toast.error(error);
        }
        if (forgotPasswordMessage) {
            toast.success(forgotPasswordMessage);
        }
    }, [loader, dispatch, error, forgotPasswordMessage]);

    return (
        <>
            <div className='container fluid-container'>
                <div className='row wrapper'>
                    <div className='col-10 col-lg-5'>
                        <form className='shadow-lg'>
                            <div className='form-group'>
                                <label htmlFor='email_field'>Email</label>
                                <input className='form-control' type='email' name='email' placeholder='xyz@gmail.com' id='email_field' value={email} onChange={handleChange} />
                            </div>
                            <button id='forgot_button' onClick={handleSubmit} className='btn btn-block py-3' disabled={loading}>
                                {loading ? <ButtonLoader /> : 'SENT REQUEST'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

