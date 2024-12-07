import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from "../../datasource/api-user";
import './Signup.css';

const Signup = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        error: '',
        redirect: false
    });
    const [success, setSuccess] = useState(false); // State for success message

    const navigate = useNavigate();

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            username: values.username || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };

        try {
            const response = await signup(user);
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setValues({ ...values, error: '', redirect: true });
                setSuccess(true); // Show success message
                console.log('Success state set to true'); // Debug log
                setTimeout(() => {
                    navigate('/users/signin'); // Redirect to login page after 3 seconds
                }, 3000);
            }
        } catch (err) {
            console.log(err);
            setValues({ ...values, error: 'Registration failed' });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Sign Up</h2>
                        </div>
                        <div className="card-body">
                            {values.error && (
                                <div className="alert alert-danger">
                                    {values.error}
                                </div>
                            )}
                            {success && (
                                <div className="alert alert-success">
                                    Registration successful! Redirecting to sign in page...
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" value={values.firstName} onChange={handleChange('firstName')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value={values.lastName} onChange={handleChange('lastName')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" value={values.username} onChange={handleChange('username')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={values.email} onChange={handleChange('email')} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" value={values.password} onChange={handleChange('password')} />
                                </div>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;