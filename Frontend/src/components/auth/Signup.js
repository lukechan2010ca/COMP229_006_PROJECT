import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        redirect: false
    });

    const navigate = useNavigate(); // Initialize navigate

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };

        try {
            const response = await Signup(user);
            if (response.error) {
                setValues({ ...values, error: response.error });
            } else {
                setValues({ ...values, error: '', redirect: true });
                navigate('/users/signin'); // Redirect after successful signup
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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

