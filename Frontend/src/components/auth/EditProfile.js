import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProfile, getUserProfile } from "../../datasource/api-user";
import UserModel from "../../datasource/userModel";

const EditProfile = () => {
    let navigate = useNavigate();
    let { userId } = useParams();
    let [user, setUser] = useState(new UserModel());

    useEffect(() => {
        getUserProfile(userId).then((response) => {
            if (response) {
                setUser(new UserModel(
                    response._id,
                    response.firstName,
                    response.lastName,
                    response.username,
                    response.email,
                    response.password
                ));
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, [userId]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUser((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        let newUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password
        };

        editProfile(newUser, userId).then(response => {
            if (response && response.success) {
                alert(response.message);
                navigate("/");
            } else {
                alert(response.message);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Edit Profile</h2>
                        </div>
                        <div className="card-body">
                            {user.error && (
                                <div className="alert alert-danger">
                                    {user.error}
                                </div>
                            )}
                            {user.success && (
                                <div className="alert alert-success">
                                    Profile updated successfully! Redirecting to Homepage...
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        name="firstName"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        name="lastName"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.username}
                                        onChange={handleChange}
                                        name="username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={user.email}
                                        onChange={handleChange}
                                        name="email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password (optional)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={user.password}
                                        onChange={handleChange}
                                        name="password"
                                        placeholder="Leave blank to keep current password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={user.loading}
                                >
                                    {user.loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                            <Link href="#" to="/" className="btn btn-warning">
                                <i className="fas fa-undo"></i>
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;