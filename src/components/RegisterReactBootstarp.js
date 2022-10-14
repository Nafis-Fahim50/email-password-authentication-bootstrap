import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../Firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstarp = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleToRegister = e =>{
        e.preventDefault();
        setSuccess(false);
        const form = e.target;
        const email= form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        console.log(email,password,name);

        // validate password 
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please provide at least two uppercase');
            return;
        }
        if(password.length<6){
            setPasswordError('Password should be at least 6 characters');
            return;
        }
        if(!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError('Please provide at least one special character');
            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            varifyEmail();
            updateUserName(name);
        })
        .catch(error =>{
            console.error('error: ', error);
            setPasswordError(error.message);
        })
        const varifyEmail = ()=>{
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                alert('Please check your inbox to varify your account');
            })
        }
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then( () => {
            console.log('display name updated')
        })
        .catch(error => console.error(error))
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h3 className='text-primary'>Please Register</h3>
            <Form onSubmit={handleToRegister}>
                <Form.Group className="mb-3" controlId="formBasicname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter your name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password  <span className='text-danger'>(including two upper case, one special and at least 6 character)</span> </Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className= 'text-danger'>{passwordError}</p>
                {
                    success && <p className='text-success'>Successfully User Created.</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default RegisterReactBootstarp;