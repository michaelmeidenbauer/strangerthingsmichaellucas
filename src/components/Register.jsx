import React, { useState } from 'react';
import { registerUser } from './api/api';

const Register = () => {
    const [userName, updateUserName] = useState(null);
    const [passWord, updatePassWord] = useState(null);

return (    
    <div>
        <h1>
            Set up your account
        </h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    registerUser(userName, passWord)
                }}
            >
                <input
                    type='text'
                    placeholder='Enter User Name'
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateUserName(event.target.value);
                    }}
                 />
                <input
                    type='text'
                    placeholder='Enter Password'
                    onSubmit={(event) => {
                        event.preventDefault();
                        updatePassWord(event.target.value);
                    }}
                 />
                <button
                    type='submit'
                >
                    Register
                </button>
            </form>
    </div>
);
}


export default Register;
