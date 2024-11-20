import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../../datasource/api-ad";
import AdModel from "../../datasource/adModel";

const EditAd = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    let [ad, setAd] = useState(new AdModel());

    useEffect(() => {
        read(id).then((response) => {
            if (response) {
                setAd(new AdModel(
                    response.id,
                    response.title,
                    response.description,
                    response.tags,
                    response.price,
                    response.expirationDate));
            }
        }).catch(err => {
            alert(err.message);
            console.log(err)
        });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAd((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newAd = {
            id: ad.id,
            title: ad.title,
            description: ad.description,
            tags: ad.tags.toString(),
            price: ad.price,
            expirationDate: ad.expirationDate
        }

        update(id, newAd).then(response => {
            if (response && response.success) {
                alert(response.message);
                navigate("/ad/list");
            }
            else {
                alert(response.message);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err)
        });
    };

    return (
        // -- Content for the Add page --
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit an Ad</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input type="hidden"
                                name="id"
                                value={ad.id || ''}>
                            </input>
                            <label htmlFor="TitleTextField">Ad Title</label>
                            <input type="text" className="form-control"
                                id="TitleTextField"
                                placeholder="Enter the ad title"
                                name="title"
                                value={ad.title || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="DescriptionTextField">Description</label>
                            <input type="text" className="form-control"
                                id="DescriptionTextField"
                                placeholder="Description"
                                name="description"
                                value={ad.description || 0}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="priceTextField">Price</label>
                            <input type="number" className="form-control"
                                id="priceTextField"
                                placeholder="Enter a price"
                                name="price"
                                value={ad.price || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="expirationDateTextField">Expiration Date</label>
                            <input type="date" className="form-control"
                                id="expirationDateTextField"
                                name="expirationDate"
                                value={ad.expirationDate || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="tagTextArea">Tags <span className="text-muted">[use , to separate tags]</span></label>
                            <textarea type="text" className="form-control"
                                id="tagTextArea"
                                placeholder="Enter the tags of the item"
                                name="tags"
                                value={ad.tags || ''}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <br />

                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>

                        <Link href="#" to="/ad/list" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditAd;
