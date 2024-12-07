import { useEffect, useState } from "react";
import { list } from "../../datasource/api-ad";
import { Link } from "react-router-dom";
import { getUserId, isAuthenticated } from "../auth/auth-helper";
import '../ad/Ad.css';

const PrivateAd = () => {
    let [adList, setAdList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    const currentUser = isAuthenticated();
    const currentUserID = getUserId();

    useEffect(() => {
        list()
            .then((data) => {
                if (data) {
                    setAdList(data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    }, []);

    // Filter the ads to show only those owned by the current user
    const ownerAds = adList.filter((ad) => ad.owner && ad.owner.id === currentUserID);

    return (
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>My Ads</h1>

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
                    {!isLoading && (
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
                                    <th className="text-center" colSpan="3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ownerAds.map((ad, i) => {
                                    const isExpired =
                                        ad.expirationDate && new Date(ad.expirationDate) < new Date();
                                    return (
                                        <tr key={i}>
                                            <td className="text-center">{ad.title || ''}</td>
                                            <td className="text-center">{ad.description || ''}</td>
                                            <td className="text-center">{ad.price || ''}</td>
                                            <td className="text-center">{ad.expirationDate || ''}</td>
                                            <td className="text-center">{ad.tags.toString() || ''}</td>
                                            <td className="text-center">{ad.isActive ? "Yes" : "No"}</td>
                                            <td className="text-center">{isExpired ? "Expired" : "No"}</td>
                                            <td className="text-center">
                                                <Link
                                                    className="btn bg-primary btn-primary btn-sm"
                                                    to={`/ad/edit/${ad._id}`}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    className="btn btn-secondary btn-sm"
                                                    to={`/ad/questions/${ad._id}`}
                                                >
                                                    <i className="fas fa-comments"></i> Product Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
};

export default PrivateAd;
