import { useEffect, useState } from "react";
import { list, remove } from "../../datasource/api-inventory";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth-helper";

const ListInventory = () => {

    let [inventoryList, setInventoryList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        list().then((data) => {
            if (data) {
                setInventoryList(data);
                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, []);

    const handleRemove = (id) => {
        if (!isAuthenticated())
            window.alert('You are not authenticated. Please, proceed with sign-in first.')
        else {
            if (window.confirm('Are you sure you want to delete this item?')) {
                remove(id).then(data => {
                    if (data && data.success) {
                        const newList = inventoryList.filter((product) => product.id !== id);
                        setInventoryList(newList);
                    }
                    else {
                        alert(data.message);
                    }
                }).catch(err => {
                    alert(err.message);
                    console.log(err)
                });
            };
        }
    };

    return (
        //   -- Main Content --
        <main className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <h1>Inventory List</h1>

                <div>
                    <Link to="/inventory/add" className="btn btn-primary align-self-end" role="button">
                        <i className="fas fa-plus-circle"></i>
                        Add a new Item
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
                                    <th className="text-center">Item</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-center">Status</th>
                                    <th>Size</th>
                                    <th className="text-center">Tags</th>
                                    <th className="text-center" colSpan="3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* -- Repeatable Template Row -- */}
                                {inventoryList.map((product, i) => {
                                    return (<tr key={i}>
                                        {console.log(product)}
                                        <td className="text-center"> {product.item || ''} </td>
                                        <td className="text-center"> {product.qty || ''} </td>
                                        <td className="text-center"> {product.status || ''} </td>
                                        <td>
                                            Hight: {product.size.h || ''}<br />
                                            Width: {product.size.w || ''}<br />
                                            UOM: {product.size.uom || ''}<br />
                                        </td>
                                        <td className="text-center">{product.tags.toString() || ''}</td>
                                        <td className="text-center">
                                            <Link className="btn bg-primary btn-primary btn-sm" to={'/inventory/edit/' + product.id}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn bg-danger btn-danger btn-sm"
                                                onClick={() => handleRemove(product.id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>}
                </div>
            </div >
        </main >)
};

export default ListInventory;