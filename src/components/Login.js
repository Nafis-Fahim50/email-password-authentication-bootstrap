import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('')

    const handleToLogin = (e) =>{
        e.preventDefault();
        setSuccess(false);
        
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error=>{
            console.error('error',error);
        })

    }
    const handleEmailBlur = (e) =>{
        const email = e.target.value;
        setUserEmail(email);
        // console.log(email);
    }
    const handleForgetPassword = ()=>{
        if(!userEmail){
            alert('Please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth,userEmail)
        .then(()=>{
            alert('A reset link is send your email. Please check it')
        })
        .catch(error =>{
            console.error('error',error);
        })
    }
    return (
        <div className='w-50 mx-auto mt-5'>
            <h1 className='text-primary'>Please Login</h1>
            <form onSubmit={handleToLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input onBlur={handleEmailBlur} type="email" className="form-control" id="formGroupExampleInput" name="email" placeholder="Enter Email" required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput2" name="password" placeholder="Enter Password" required />
                </div>
                <button className='btn btn-primary'>Login</button>
            </form>
            {
                success && <p className='text-success fw-bold'>Successfully login your account</p>
            }
            <p><small>New to this website? Please <Link to='/signup'>Signup</Link></small></p>
            <p><small>Forget Password? <button type="button" onClick={handleForgetPassword} className="btn btn-link">Reset Password</button></small></p>
        </div>
    );
};

export default Login;