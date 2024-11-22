import React from 'react';
import { useEffect, useState } from "react";

let apiURL = process.env.REACT_APP_API_URL;
//let apiURL = "http://localhost:3001";
const list = async () => {
  try {
    let response = await fetch(apiURL + '/ad/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
  } catch (err) {
    console.log(err)
  }
}

const ProductList = () => {
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
    <div className="table-responsive">
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        <div className="product-grid">
          {adList.map((ad, i) => {
            return (
              <div key={i} className="product-card">
                <h3>{ad.title}</h3>
                <p>{ad.price}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
};

export default ProductList;