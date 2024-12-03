import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-ad";
import AdModel from "../../datasource/adModel";

const AddAd = () => {

    let navigate = useNavigate();
    let [ad, setAd] = useState(new AdModel());

    const handleChange = (event) => {
        const { name, value , type, checked } = event.target;
        setAd((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Ad state before submission:', ad);
    
        let newAd = {
            id: ad.id || null,
            title: ad.title || '',
            description: ad.description || '',
            tags: ad.tags || '',
            price: ad.price || 0,
            expirationDate: ad.expirationDate || '',
            isActive: ad.isActive || false
        };
    
        create(newAd)
            .then((response) => {
                console.log("API Response:", response);
                if (response && response._id) { 
                    alert(`Item added with the ID ${response._id}`);
                    navigate("/ad/list");
                } else {
                    alert(response.message || "Failed to add the item.");
                }
            })
            .catch((err) => {
                alert(err.message || "An error occurred.");
                console.error(err);
            });
    };
    

    return (
        // -- Content for the Add page --
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add a new ad</h1>

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
                                value={ad.description || ''}
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
                        <div className="form-group">
                            <label htmlFor="isActiveCheck">Active</label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActiveCheck"
                                name="isActive"
                                checked={ad.isActive || false} 
                                onChange={handleChange}
                            />
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

export default AddAd;
