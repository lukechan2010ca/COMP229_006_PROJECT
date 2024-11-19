import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../../datasource/api-inventory";
import InventoryModel from "../../datasource/inventoryModel";

const EditInventory = () => {

    let navigate = useNavigate();
    let { id } = useParams();
    let [product, setProduct] = useState(new InventoryModel());

    useEffect(() => {
        read(id).then((response) => {
            if (response) {
                setProduct(new InventoryModel(
                    response.id,
                    response.item,
                    response.qty,
                    response.tags,
                    response.status,
                    response.size.h,
                    response.size.w,
                    response.size.uom));
            }
        }).catch(err => {
            alert(err.message);
            console.log(err)
        });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newProduct = {
            id: product.id,
            item: product.item,
            qty: product.qty,
            tags: product.tags.toString(),
            status: product.status,
            size: {
                h: product.size_h,
                w: product.size_w,
                uom: product.size_uom
            }
        }

        update(id, newProduct).then(response => {
            if (response && response.success) {
                alert(response.message);
                navigate("/inventory/list");
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
                    <h1>Edit an item</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input type="hidden"
                                name="id"
                                value={product.id || ''}>
                            </input>
                            <label htmlFor="itemTextField">Item Name</label>
                            <input type="text" className="form-control"
                                id="itemTextField"
                                placeholder="Enter the Item Name"
                                name="item"
                                value={product.item || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="QtyTextField">Quantity</label>
                            <input type="number" className="form-control"
                                id="QtyTextField"
                                placeholder="00"
                                name="qty"
                                value={product.qty || 0}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="statusTextField">Status</label>
                            <input type="text" className="form-control"
                                id="statusTextField"
                                placeholder="Enter a status"
                                name="status"
                                value={product.status || ''}
                                onChange={handleChange}>
                            </input>
                        </div>
                        <br />
                        <div className="card">
                            <div className="card-header">Size</div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="hightTextField">Hight</label>
                                    <input type="number" step="0.01"
                                        className="form-control"
                                        id="hightTextField"
                                        placeholder="0.00"
                                        name="size_h"
                                        value={product.size_h || 0}
                                        required
                                        onChange={handleChange}>
                                    </input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="widthTextField">Width</label>
                                    <input type="number" step="0.01"
                                        className="form-control"
                                        id="widthTextField"
                                        placeholder="0.00"
                                        name="size_w"
                                        value={product.size_w || 0}
                                        onChange={handleChange}
                                        required>
                                    </input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="uomTextField">UOM</label>
                                    <input type="text" className="form-control"
                                        id="uomTextField"
                                        placeholder="cm"
                                        name="size_uom"
                                        value={product.size_uom || ''}
                                        onChange={handleChange}
                                        required>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="tagTextArea">Tags <span className="text-muted">[use , to separate tags]</span></label>
                            <textarea type="text" className="form-control"
                                id="tagTextArea"
                                placeholder="Enter the tags of the item"
                                name="tags"
                                value={product.tags || ''}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <br />

                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>

                        <Link href="#" to="/inventory/list" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditInventory;
