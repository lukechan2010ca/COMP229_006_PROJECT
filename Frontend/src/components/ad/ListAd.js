import { useEffect, useState } from "react";
import { list } from "../../datasource/api-ad";
import { Link } from "react-router-dom";

const ListAd = () => {

    let [adList, setAdList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

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
        //   -- Main Content --
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>ad List</h1>

                <div>
                    <Link to="/ad/add" className="btn btn-primary align-self-end" role="button">
                        <i className="fas fa-plus-circle"></i>
                        Add a new Ad
                    </Link>
                </div>
                <br />
                <br />
                <div className="table-responsive" >
                    {isLoading && <div>Loading...</div>}
                    {!isLoading &&
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                {/* -- Header Row-- */}
                                <tr>
                                    <th className="text-center">Title</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Expiration Date</th>
                                    <th className="text-center">Tags</th>
                                    <th className="text-center" colSpan="3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* -- Repeatable Template Row -- */}
                                {adList.map((ad, i) => {
                                    return (<tr key={i}>
                                        {console.log(ad)}
                                        <td className="text-center"> {ad.title || ''} </td>
                                        <td className="text-center"> {ad.description || ''} </td>
                                        <td className="text-center"> {ad.price || ''} </td>
                                        <td className="text-center"> {ad.expirationDate || ''} </td>
                                        <td className="text-center">{ad.tags.toString() || ''}</td>
                                        <td className="text-center">
                                            <Link className="btn bg-primary btn-primary btn-sm" to={'/ad/edit/' + ad.id}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                        </td>
                                
                                    </tr>)
                                })}
                            </tbody>
                        </table>}
                </div>
            </div >
        </main >)
};

export default ListAd;