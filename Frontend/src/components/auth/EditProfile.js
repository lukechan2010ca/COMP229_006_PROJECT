import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProfile, getUserProfile } from "../../datasource/api-user";
import UserModel from "../../datasource/userModel";

const EditProfile = () => {
    let navigate = useNavigate();
    let { userId } = useParams();
    let [user, setUser] = useState(new UserModel());

   useEffect(() => {
        //console.log(userId);
        getUserProfile(userId).then((oldUserDetails) => {
            if (oldUserDetails) {
                setUser(new UserModel(
                    oldUserDetails.firstName,
                    oldUserDetails.lastName,
                    oldUserDetails.username,
                    oldUserDetails.email,
                    oldUserDetails.password
                ));
                //console.log("this is old User data:", oldUserDetails);
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
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password
        };
        //console.log("this is new User data:", newUser);
        //console.log(JSON.stringify(newUser, null, 2));


        editProfile(newUser,userId).then(response => {
            if (response && response.success) {
                alert(response.message);
                navigate("/");
            } else {
                alert(response.message);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
            /* console.log(newUser);
            console.log(JSON.stringify(newUser, null, 2));
            console.log(JSON.stringify(user, null, 2)); */
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
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default EditProfile;