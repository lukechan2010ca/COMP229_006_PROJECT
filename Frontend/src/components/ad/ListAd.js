import { useEffect, useState } from "react";
import { list } from "../../datasource/api-ad";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth-helper";

let apiURL = process.env.REACT_APP_API_URL;
const ListAd = () => {
    let [adList, setAdList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    const currentUser = isAuthenticated();

    useEffect(() => {
        list().then((data) => {
            if (data) {
                setAdList(data);
                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, []);

    return (
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>Ad List</h1>

                <div>
                    <Link to="/ad/add" className="btn btn-primary align-self-end" role="button">
                        <i className="fas fa-plus-circle"></i>
                        Add a new Ad
                    </Link>
                </div>
                <br />
                <br />
                <div className="table-responsive">
                    {isLoading && <div>Loading...</div>}
                    {!isLoading &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">Title</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Expiration Date</th>
                                    <th className="text-center">Tags</th>
                                    <th className="text-center">Active</th>
                                    <th className="text-center">Expired</th>
                                    <th className="text-center" colSpan="4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {adList.map((ad, i) => {
                                    const isExpired = ad.expirationDate && new Date(ad.expirationDate) < new Date();
                                    return (
                                        <tr key={i}>
                                            <td className="text-center">{ad.title || ''}</td>
                                            <td className="text-center">{ad.description || ''}</td>
                                            <td className="text-center">{ad.price || ''}</td>
                                            <td className="text-center">{ad.expirationDate || ''}</td>
                                            <td className="text-center">{ad.tags.toString() || ''}</td>
                                            <td className="text-center">{ad.isActive ? "Yes" : "No"}</td>
                                            <td className="text-center">{isExpired ? "Expired" : ""}</td>
                                            <td className="text-center">
                                            {currentUser && currentUser.userId === ad.owner._id && (
                                                <Link className="btn bg-primary btn-primary btn-sm" to={`/ad/edit/${ad._id}`}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Link>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <Link className="btn btn-secondary btn-sm" to={`/ad/questions/${ad._id}`}>
                                                    <i className="fas fa-comments"></i> Message Board
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </main>
    );
};

export default ListAd;
